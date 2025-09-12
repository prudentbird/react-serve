import { createFileRoute } from '@tanstack/react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Route = createFileRoute('/docs/middleware')({
  component: MiddlewarePage,
});

function CodeBlock({ code, language = 'tsx' }: { code: string; language?: string }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={tomorrow}
      customStyle={{
        background: "transparent",
        padding: 0,
        margin: 0,
        fontSize: "0.95rem",
        borderRadius: "0.5rem",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}

function MiddlewarePage() {
  const basicExample = `const loggingMiddleware = (req, next) => {
  console.log(\`\${req.method} \${req.path}\`);
  return next();
};

<Middleware use={loggingMiddleware} />`;

  const authExample = `const authMiddleware = (req, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return <Response status={401} json={{ error: "Unauthorized" }} />;
  }
  
  const user = verifyToken(token);
  useSetContext("user", user);
  return next();
};

<RouteGroup prefix="/api">
  <Middleware use={authMiddleware} />
  <Route path="/profile" method="GET">
    {() => {
      const user = useContext("user");
      return <Response json={user} />;
    }}
  </Route>
</RouteGroup>`;

  const multipleExample = `<RouteGroup prefix="/api">
  <Middleware use={[corsMiddleware, rateLimitMiddleware, authMiddleware]} />
  
  <Route path="/users" method="GET">
    {() => <Response json={{ users: [] }} />}
  </Route>
</RouteGroup>`;

  const routeMiddlewareExample = `<Route path="/admin" method="GET" middleware={adminOnlyMiddleware}>
  {() => <Response json={{ admin: true }} />}
</Route>`;

  return (
    <div className="space-y-8">
      <h1 className="text-xl mb-2">Middleware</h1>
      <p className="text-sm text-zinc-400 mb-6">
        The <code>&lt;Middleware&gt;</code> component defines functions that run before route handlers. Use them for authentication, logging, validation, and more.
      </p>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Basic Usage</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={basicExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Props</h2>
        <div className="space-y-3 text-sm">
          <div>
            <code className="text-zinc-300">use</code>
            <span className="text-zinc-500 ml-2">MiddlewareFunction | MiddlewareFunction[] (required)</span>
            <p className="text-zinc-400 text-xs mt-1">The middleware function(s) to execute.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Middleware Function</h2>
        <p className="text-xs text-zinc-500 mb-2">Middleware functions receive the request and a next function</p>
        <div className="space-y-3 text-sm">
          <div>
            <code className="text-zinc-300">(req, next) =&gt; any</code>
            <p className="text-zinc-400 text-xs mt-1">
              Call <code>next()</code> to continue to the next middleware/handler.<br/>
              Return a <code>&lt;Response&gt;</code> to short-circuit and send a response.
            </p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Authentication Example</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={authExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Multiple Middleware</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={multipleExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Route-Level Middleware</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={routeMiddlewareExample} />
        </div>
      </section>
    </div>
  );
}
