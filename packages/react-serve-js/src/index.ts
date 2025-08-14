export {
  serve,
  useRoute,
  useSetContext,
  useContext,
  type Middleware as MiddlewareFunction,
} from "./runtime";
import React from "react";

export function App({
  children,
  port,
}: {
  children: any;
  port?: number;
}): React.ReactElement {
  return { type: "App", props: { children, port } } as any;
}

export function Route({
  children,
  path,
  method,
  middleware,
}: {
  children: any;
  path: string;
  method: string;
  middleware?:
    | import("./runtime").Middleware
    | import("./runtime").Middleware[];
}): React.ReactElement {
  return {
    type: "Route",
    props: { children, path, method, middleware },
  } as any;
}

export function Response({
  json,
  status,
}: {
  json?: any;
  status?: number;
}): React.ReactElement {
  return { type: "Response", props: { json, status } } as any;
}

export function Middleware({
  use,
}: {
  use: import("./runtime").Middleware;
}): React.ReactElement {
  return { type: "Middleware", props: { use } } as any;
}

export function RouteGroup({
  children,
  prefix,
}: {
  children: any;
  prefix?: string;
}): React.ReactElement {
  return { type: "RouteGroup", props: { children, prefix } } as any;
}
