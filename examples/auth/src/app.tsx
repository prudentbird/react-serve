import {
  App,
  Route,
  RouteGroup,
  Middleware,
  serve,
} from "react-serve-js";

import { PORT } from "./config";
import { authMiddleware, loggingMiddleware } from "./middlewares";
import { SignupHandler, LoginHandler } from "./routes/auth";
import { GetCurrentUserHandler, UpdateProfileHandler } from "./routes/profile";
import { GetAllUsersHandler, GetUserByIdHandler } from "./routes/users";
import { GetStatsHandler } from "./routes/admin";
import { ApiInfoHandler } from "./routes/info";

export default function AuthBackend() {
  return (
    <App port={PORT} cors={true}>
      {/* Health check */}
      <Route path="/" method="GET">
        {ApiInfoHandler}
      </Route>

      {/* Auth routes */}
      <RouteGroup prefix="/auth">
        <Middleware use={loggingMiddleware} />

        {/* Sign up */}
        <Route path="/signup" method="POST">
          {SignupHandler}
        </Route>

        {/* Login */}
        <Route path="/login" method="POST">
          {LoginHandler}
        </Route>

        {/* Get current user (protected) */}
        <Route path="/me" method="GET" middleware={authMiddleware}>
          {GetCurrentUserHandler}
        </Route>

        {/* Update profile (protected) */}
        <Route path="/profile" method="PUT" middleware={authMiddleware}>
          {UpdateProfileHandler}
        </Route>
      </RouteGroup>

      {/* Public user routes */}
      <RouteGroup prefix="/users">
        <Middleware use={loggingMiddleware} />

        {/* Get all users */}
        <Route path="/" method="GET">
          {GetAllUsersHandler}
        </Route>

        {/* Get user by ID */}
        <Route path="/:id" method="GET">
          {GetUserByIdHandler}
        </Route>
      </RouteGroup>

      {/* Protected admin routes */}
      <RouteGroup prefix="/admin">
        <Middleware use={loggingMiddleware} />
        <Middleware use={authMiddleware} />

        {/* Get user stats */}
        <Route path="/stats" method="GET">
          {GetStatsHandler}
        </Route>
      </RouteGroup>
    </App>
  );
}
