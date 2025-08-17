import { createFileRoute } from '@tanstack/react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Route = createFileRoute('/docs/usecontext')({
  component: UseContextPage,
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

function UseContextPage() {
  const basicExample = `import { useContext, Response } from "react-serve-js";

<Route path="/profile" method="GET">
  {() => {
    const user = useContext("user");
    const requestId = useContext("requestId");
    
    if (!user) {
      return <Response status={401} json={{ error: "Unauthorized" }} />;
    }
    
    return <Response json={{ user, requestId }} />;
  }}
</Route>`;

  const defaultValueExample = `<Route path="/settings" method="GET">
  {() => {
    // Provide default values for missing context
    const theme = useContext("theme") || "light";
    const language = useContext("language") || "en";
    
    return <Response json({ theme, language }) />;
  }}
</Route>`;

  const fullExample = `// Middleware sets context
const setupMiddleware = (req, next) => {
  useSetContext("user", getCurrentUser(req));
  useSetContext("permissions", getUserPermissions(req));
  useSetContext("startTime", Date.now());
  return next();
};

// Route uses context
<RouteGroup prefix="/api">
  <Middleware use={setupMiddleware} />
  
  <Route path="/dashboard" method="GET">
    {() => {
      const user = useContext("user");
      const permissions = useContext("permissions");
      const startTime = useContext("startTime");
      
      const data = getDashboardData(user, permissions);
      const duration = Date.now() - startTime;
      
      return <Response json({ 
        data, 
        meta: { 
          user: user.id, 
          duration 
        } 
      }) />;
    }}
  </Route>
</RouteGroup>`;

  const errorHandlingExample = `<Route path="/admin" method="GET">
  {() => {
    const user = useContext("user");
    const permissions = useContext("permissions");
    
    // Check if context exists
    if (!user) {
      return <Response status={401} json({ error: "Not authenticated" }) />;
    }
    
    if (!permissions?.includes("admin")) {
      return <Response status={403} json({ error: "Admin access required" }) />;
    }
    
    return <Response json({ adminData: getAdminData() }) />;
  }}
</Route>`;

  return (
    <div className="space-y-8">
      <h1 className="text-xl mb-2">useContext</h1>
      <p className="text-sm text-zinc-400 mb-6">
        The <code>useContext(key)</code> hook retrieves data from the middleware context that was previously set using <code>useSetContext(key, value)</code>.
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
            <p className="text-zinc-400 text-xs mt-1">The key to retrieve from the context map.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Return Value</h2>
        <div className="space-y-3 text-sm">
          <div>
            <span className="text-zinc-500">any | undefined</span>
            <p className="text-zinc-400 text-xs mt-1">Returns the value stored at the given key, or <code>undefined</code> if the key doesn't exist.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Default Values</h2>
        <p className="text-xs text-zinc-500 mb-2">Handle missing context gracefully with default values</p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={defaultValueExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Complete Example</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={fullExample} />
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">Error Handling</h2>
        <p className="text-xs text-zinc-500 mb-2">Always check if required context exists before using it</p>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={errorHandlingExample} />
        </div>
      </section>
    </div>
  );
}
