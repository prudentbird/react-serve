# Reactend

> React-style backend framework for building APIs with JSX

[![npm version](https://badge.fury.io/js/reactend.svg)](https://badge.fury.io/js/reactend)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Reactend lets you build backend APIs using React-style JSX syntax. Define routes, handle requests, and send responses all within familiar JSX components.

## Quick Start

Create a new Reactend app:

```bash
npx create-react-serve my-api
cd my-api
npm install
npm run dev
```

## Example

```tsx
import { App, Route, Response, useRoute, serve } from "react-serve-js";

function Backend() {
  return (
    <App port={3000}>
      <Route path="/" method="GET">
        {async () => {
          return <Response json={{ message: "Hello World!" }} />;
        }}
      </Route>

      <Route path="/users/:id" method="GET">
        {async () => {
          const { params } = useRoute();
          const user = await getUserById(params.id);
          return user ? (
            <Response json={user} />
          ) : (
            <Response status={404} json={{ error: "User not found" }} />
          );
        }}
      </Route>
    </App>
  );
}

serve(Backend());
```

## Features

- 🔥 **Hot Reload** - Automatic server restart on file changes
- 🎯 **Type Safe** - Full TypeScript support
- ⚡ **Fast** - Built on Express.js
- 🧩 **Composable** - Use React patterns for API logic
- 📦 **Zero Config** - Works out of the box
- 🛠️ **CLI Tool** - Bootstrap new projects instantly

## Packages

This repository is a monorepo containing:

### Core Packages

- [`reactend`](./packages/reactend) - The core framework
- [`create-reactend`](./packages/create-reactend) - CLI tool for bootstrapping apps

### Examples

- [`basic`](./examples/basic) - Basic API example with CRUD operations

## Documentation

### Components

**`<App>`** - Root component that configures your server

- `port?: number` - Server port (default: 9000)

**`<Route>`** - Defines an API endpoint

- `path: string` - URL path pattern
- `method: string` - HTTP method (GET, POST, PUT, DELETE, etc.)
- `children: () => Promise<ReactElement>` - Request handler

**`<Response>`** - Sends response to client

- `json?: any` - JSON response data
- `status?: number` - HTTP status code (default: 200)

### Hooks

**`useRoute()`** - Access request data

- Returns: `{ params, query, body, req, res }`
