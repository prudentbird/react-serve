import { createFileRoute } from '@tanstack/react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Route = createFileRoute('/docs/app')({
  component: AppPage,
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

function AppPage() {
  const basicExample = `import { App, Route, Response, serve } from "react-serve-js";

function Backend() {
  return (
    <App 
      port={6969}
      cors={true} // Enable cross-origin requests
    >
      <Route path="/" method="GET">
        {() => <Response json={{ message: "Hello World" }} />}
      </Route>
    </App>
  );
}

serve(Backend());`;

  const optionsExample = `<App 
  port={8080}
  cors={true} // Enable CORS with default options
>
  {/* Routes */}
</App>`;

  const corsOptionsExample = `<App 
  port={6969}
  cors={{
    origin: ['http://localhost:3000', 'https://myapp.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }}
>
  {/* Routes */}
</App>`;

  return (
    <div className="space-y-8">
      <h1 className="text-xl mb-2">App</h1>
      <p className="text-sm text-zinc-400 mb-6">
        The <code>&lt;App&gt;</code> component is the root of your ReactServe application. It configures the Express server and wraps all your routes.
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
            <code className="text-zinc-300">port</code>
            <span className="text-zinc-500 ml-2">number (default: 6969)</span>
            <p className="text-zinc-400 text-xs mt-1">The port number for the server to listen on.</p>
          </div>
          <div>
            <code className="text-zinc-300">cors</code>
            <span className="text-zinc-500 ml-2">boolean | CorsOptions (default: false)</span>
            <p className="text-zinc-400 text-xs mt-1">Enable CORS middleware. Pass <code>true</code> to enable CORS with default options, or pass a CORS options object for custom configuration.</p>
            <div className="mt-2 text-zinc-400 text-xs">
              <p>Common CORS options include:</p>
              <ul className="list-disc pl-4 mt-1">
                <li><code>origin</code>: String, array, or function specifying allowed origins</li>
                <li><code>methods</code>: Array of allowed HTTP methods</li>
                <li><code>allowedHeaders</code>: Array of headers that are allowed</li>
                <li><code>exposedHeaders</code>: Array of headers that are exposed</li>
                <li><code>credentials</code>: Boolean indicating if cookies are allowed</li>
                <li><code>maxAge</code>: Number indicating how long results can be cached</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-base mb-2 text-zinc-300">With Simple CORS</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={optionsExample} />
        </div>
      </section>
      
      <section>
        <h2 className="text-base mb-2 text-zinc-300">With Advanced CORS Options</h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4">
          <CodeBlock code={corsOptionsExample} />
        </div>
      </section>
    </div>
  );
}
