## TurboRepo Setup

- https://turborepo.dev/docs/getting-started/installation

```shell
pnpm dlx create-turbo@latest
rm -rf apps/*
rm -rf packages/*

# mkdir -p apps/web
pnpm create vite .
# mkdir -p apps/api
nest new . -s
```

## TurboRepo packages

```shell
mkdir -p packages/schemas
```

- [package.json](/packages/schemas/package.json)

```shell
cd apps/api
pnpm add nestjs-zod "@repo/schemas@workspace:*"
cd apps/web
pnpm add "@repo/schemas@workspace:*"
```

## Oxfmt

- https://oxc.rs/docs/guide/usage/formatter/quickstart.html

```shell
pnpm add -D -w oxfmt
```
