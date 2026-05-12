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

## Oxfmt

- https://oxc.rs/docs/guide/usage/formatter/quickstart.html

```shell
pnpm add -D -w oxfmt
```
