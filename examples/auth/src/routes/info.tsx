import { Response } from "react-serve-js";

// API information handler
export async function ApiInfoHandler() {
  return (
    <Response
      json={{
        message: "ReactServe Auth Example API",
        version: "1.0.0",
        endpoints: {
          auth: {
            signup: "POST /auth/signup",
            login: "POST /auth/login",
            me: "GET /auth/me (requires auth)",
            profile: "PUT /auth/profile (requires auth)",
          },
          users: {
            list: "GET /users",
            getById: "GET /users/:id",
          },
        },
      }}
    />
  );
}
