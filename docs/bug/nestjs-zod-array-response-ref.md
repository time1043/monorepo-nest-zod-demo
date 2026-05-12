# nestjs-zod 5.3.0 breaks `$ref` in array response schemas

## Symptom

Swagger UI shows resolver error on `GET /users`:

```
Resolver error at paths./users.get.responses.default.content.application/json.schema.items.$ref
Could not resolve reference: Could not resolve pointer: /components/schemas/UserResponseDto_Output does not exist in document
```

## Root cause

`fixRefsInBodies` in `cleanupOpenApiDoc` only patches direct `schema.$ref` in response bodies. It does **not** traverse into `items.$ref`, `anyOf`, `oneOf`, `allOf`, or `additionalProperties`. When `cleanupSchema` renames a schema, array response refs become dangling pointers.

## Why 5.1.1 worked but 5.3.0 doesn't

Both versions have the same `fixRefsInBodies` gap. The trigger condition changed.

In `openApiMetadataFactory`, when the generated JSON schema is not an object-with-properties (e.g. a bare `$ref`), it gets wrapped in a root object:

**5.1.1:**

```js
const jsonSchema = !isObjectTypeWithProperties(generatedJsonSchema) ? {
    type: "object",
    properties: { root: { ...generatedJsonSchema, [UNWRAP_ROOT_KEY]: true } },
    $defs
} : { ... };
```

Wrapper has no `id` → `jsonSchema.id` is `undefined` → `PARENT_ID_KEY` not set → `cleanupSchema` does **not** rename → schema key stays `UserResponseDto_Output` → `items.$ref` resolves correctly.

**5.3.0:**

```js
const jsonSchema = !isObjectTypeWithProperties(generatedJsonSchema) ? {
    type: "object",
    id: generatedJsonSchema.id,       // ← added
    title: generatedJsonSchema.title, // ← added
    properties: { root: { ...generatedJsonSchema, [UNWRAP_ROOT_KEY]: true } },
    $defs
} : { ... };
```

Wrapper now has `id` → `jsonSchema.id = "UserResponse_Output"` (from `.meta({ id: 'UserResponse' })` + `_Output` suffix) → `PARENT_ID_KEY` set → `cleanupSchema` renames `UserResponseDto_Output` → `UserResponse_Output` → `items.$ref` still points to old name → **broken**.

## The full chain

1. `UserResponseSchema.meta({ id: 'UserResponse' })` sets zod v4 schema id
2. `createZodDto(UserResponseSchema)` creates class `UserResponseDto`
3. `@ZodResponse({ type: [UserResponseDto] })` triggers `.Output` variant
4. `.Output` class named `UserResponseDto_Output`, its `_OPENAPI_METADATA_FACTORY` calls `generateJsonSchema` with `io: "output"`
5. Override appends `_Output` to id → `"UserResponse_Output"`
6. NestJS registers schema under class name `UserResponseDto_Output` in `components.schemas`
7. 5.3.0 wrapper passes `id` through → `PARENT_ID_KEY = "UserResponse_Output"` → `cleanupSchema` renames
8. Array response has `items.$ref: "#/components/schemas/UserResponseDto_Output"` but schema was renamed
9. `fixRefsInBodies` only checks `schema.$ref`, not `items.$ref` → ref stays broken

## Workaround

Align zod `meta.id` with the DTO class name so no rename occurs:

```diff
- export const UserResponseSchema = UserSchema.meta({ id: 'UserResponse' });
+ export const UserResponseSchema = UserSchema.meta({ id: 'UserResponseDto' });
```

Now zod id `UserResponseDto` → Output id `UserResponseDto_Output` matches Output class name `UserResponseDto_Output` → `newSchemaName === oldSchemaName` → no rename → `items.$ref` resolves.

## Upstream fix needed

`fixRefsInBodies` should recursively walk the response schema and fix `$ref` values inside `items`, `anyOf`, `oneOf`, `allOf`, `additionalProperties`, etc. — the same way `walkJsonSchema` already does elsewhere in the codebase.
