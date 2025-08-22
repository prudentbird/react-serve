# ReactServe File-based Routing Example

This example demonstrates file-system routing using ReactServe.

## Prerequisites

- Node.js 18+
- From the repo root, install dependencies once:

```bash
npm install
```

## Run

From the repo root (recommended):

```bash
npm run dev --workspace=examples/basic-fs
```

Or from this folder directly:

```bash
cd examples/basic-fs
npm install
npm run dev
```

Server starts at http://localhost:7070

## Quick verification

With the server running, you can hit endpoints manually or run the helper script:

```bash
cd examples/basic-fs
bash test-endpoints.sh
```

## Structure

```
examples/basic-fs/
  backend.tsx - Bootstraps the app
  src/
    app.tsx - Uses <FileRoutes dir> under /api prefix
    routes/
      route.tsx - "/api" root GET/POST
      users/
        route.tsx - "/api/users" GET/POST
        [id]/route.tsx - "/api/users/:id" GET
      blog/
        [...slug]/route.tsx - "/api/blog/:slug" catch-all GET
      docs/
        [[...slug]]/route.tsx - optional catch-all: "/api/docs" and deeper
      (marketing)/route.tsx - route group not in URL
      admin/
        _middleware.ts - dir-level middleware (auth)
        route.tsx - "/api/admin" GET
        stats/route.tsx - "/api/admin/stats" GET
```

## Notes

- Files named `route.tsx` (or .ts/.js) map to paths derived from folder names.
- Export functions named after HTTP methods: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `OPTIONS`, `HEAD`. A `default` export acts as `GET`.
- Dynamic segments: `[id]` -> `:id`
- Catch-all segments: `[...slug]` -> `:slug*`
- Optional catch-all: `[[...slug]]` -> `:slug*` (also matches base path)
- Route groups: `(marketing)` are omitted from URL paths.
- Directory-level middleware: `_middleware.(ts|tsx|js|jsx)` exports a default middleware or array of middlewares. In this example, admin routes require `Authorization: Bearer valid-token`.
