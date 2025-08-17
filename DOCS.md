# React Serve JS & Create React Serve Documentation

## Overview

This documentation covers the `react-serve-js` package and the `create-react-serve` CLI tool. These tools provide a React-inspired, component-based API for building backend HTTP servers using Express, with support for declarative routing, middleware, and hot reloading. The CLI helps scaffold new projects using this system.

---

## Packages

- **react-serve-js**: Core runtime for building servers with React-like components.
- **create-react-serve**: CLI for scaffolding new projects using react-serve-js.

---

## react-serve-js

### Installation

```
npm install react-serve-js
```

### Key Concepts

- **Component-based Routing**: Define routes and middleware using JSX/React components.
- **Middleware**: Use custom middleware components/functions.
- **Context Hooks**: Access request/response and share data between middleware and routes.
- **Hot Reload**: Automatic server restart on file changes in development.

### API Reference

#### `serve(element: ReactNode)`

Bootstraps the server using a React element tree.

- **element**: The root JSX element (usually `<App />`).
- Returns: The Express server instance.

#### Components

##### `<App port={number} cors={boolean|CorsOptions}>`
Defines the application and sets the port (default: 9000). The `cors` prop enables CORS middleware - set to `true` for default configuration or provide custom CORS options.

##### `<RouteGroup prefix={string}>`
Groups routes under a common path prefix and/or shared middleware.

##### `<Route method="GET|POST|..." path="/path" middleware={fn|fn[]}>`
Defines a route. Children is the handler function/component.

##### `<Middleware use={fn}>`
Declares a middleware function for a group or route.

##### `<Response status={number} json={any}>`
Sends a response with the given status and JSON body.

#### Hooks

##### `useRoute()`
Returns the current route context:
- `req`: Express Request
- `res`: Express Response
- `params`, `query`, `body`: Request data
- `middlewareContext`: Map for sharing data

##### `useSetContext(key, value)`
Sets a value in the middleware context map.

##### `useContext(key)`
Retrieves a value from the middleware context map.

#### Middleware Type

```ts
type Middleware = (req: Request, next: () => any) => any;
```
- Call `next()` to continue to the next middleware/handler.
- Return a value to short-circuit and send a response.

#### Example Usage

```tsx
import { serve, useRoute, Response } from "react-serve-js";

function HelloRoute() {
  const { query } = useRoute();
  return <Response status={200} json={{ hello: query.name || "world" }} />;
}

serve(
  <App 
    port={6969}
    cors={true} // Enable CORS for all routes
  >
    <RouteGroup prefix="/api">
      <Route method="GET" path="/hello">
        {HelloRoute}
      </Route>
    </RouteGroup>
  </App>
);
```

#### Hot Reload

- In development (`NODE_ENV !== 'production'`), the server watches for `.ts`/`.tsx` file changes and restarts automatically.

---

## create-react-serve

### Overview

A CLI tool to scaffold new projects using `react-serve-js`.

### Usage

```
npx create-react-serve <project-name>
```

- Prompts for project details and sets up a new directory with a basic template.
- Template includes a sample `index.tsx` using the API described above.

### Template Structure

- `src/index.tsx`: Entry point with example routes.
- `package.json`, `tsconfig.json`, `README.md`: Standard project files.

---

## File Structure

### react-serve-js

- `src/runtime.ts`: Main runtime implementation (see API above).
- `src/index.ts`: Entry point for exports.

### create-react-serve

- `src/cli.ts`: CLI entry point.
- `src/create-app.ts`: Project scaffolding logic.
- `templates/basic/`: Basic project template.

---

## Advanced Usage

- **Custom Middleware**: Use `<Middleware use={fn}>` inside `<RouteGroup>` or `<Route>`.
- **Nested RouteGroups**: Compose groups for modular route organization.
- **Context Sharing**: Use `useSetContext`/`useContext` to share data between middleware and handlers.

---

## License

See `LICENSE` file for details.

---

## Contributing

Contributions are welcome! Please open issues or pull requests on GitHub.
