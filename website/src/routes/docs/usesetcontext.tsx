import { createFileRoute } from '@tanstack/react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Route = createFileRoute('/docs/usesetcontext')({
  component: UseSetContextPage,
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

function UseSetContextPage() {
  const basicExample = `import { useSetContext } from "react-serve-js";

const authMiddleware = (req, next) => {
  const token = req.headers.authorization;
  const user = verifyToken(token);
  
  // Set user data in context for routes to access
  useSetContext("user", user);
  useSetContext("timestamp", Date.now());
  
  return next();
};`;

  const middlewareExample = `<RouteGroup prefix="/api">
  <Middleware use={authMiddleware} />
  
  <Route path="/profile" method="GET">
    {() => {
      const user = useContext("user");
      const timestamp = useContext("timestamp");
      
      return <Response json={{ 
        user, 
        requestedAt: timestamp 
      }} />;
    }}
  </Route>
</RouteGroup>`;

  const requestIdExample = `const requestIdMiddleware = (req, next) => {
  const requestId = crypto.randomUUID();
  useSetContext("requestId", requestId);
  
  // Also set it as a response header
  req.res.setHeader("X-Request-ID", requestId);
  
  return next();
};`;

  const loggingExample = `const loggingMiddleware = (req, next) => {
  const startTime = Date.now();
  useSetContext("startTime", startTime);
  
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.path}\`);
  
  return next();
};

<Route path="/users" method="GET">
  {() => {
    const startTime = useContext("startTime");
    const duration = Date.now() - startTime;
    
    useSetContext("duration", duration);
    
    return <Response json({ 
      users: [], 
      meta: { duration } 
    }) />;
  }}
</Route>`;

  return (
    <div className="space-y-8">
      <h1 className="text-xl mb-2">useSetContext</h1>
      <p className="text-sm text-zinc-400 mb-6">
        The <code>useSetContext(key, value)</code> hook stores data in the middleware context that can be accessed by subsequent middleware and route handlers using <code>useContext(key)</code>.
      </p>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Basic Usage</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={basicExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Parameters</h2>
        <div className="space-y-3 text-sm">
          <div>
            <code className="text-zinc-300">key</code>
            <span className="text-zinc-500 ml-2">string (required)</span>
            <p className="text-zinc-400 text-xs mt-1">The key to store the value under in the context map.</p>
          </div>
          <div>
            <code className="text-zinc-300">value</code>
            <span className="text-zinc-500 ml-2">any (required)</span>
            <p className="text-zinc-400 text-xs mt-1">The value to store. Can be any type (object, string, number, etc.).</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Usage in Routes</h2>
        <p className="text-xs text-zinc-500 mb-2">Access the context data set by middleware in your route handlers</p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={middlewareExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Request ID Example</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={requestIdExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Request Timing Example</h2>
        <p className="text-xs text-zinc-500 mb-2">Track request duration using context</p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={loggingExample} />
        </div>
      </section>

      
    </div>
  );
}
