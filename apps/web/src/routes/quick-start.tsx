import { createFileRoute } from '@tanstack/react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Route = createFileRoute('/quick-start')({
  component: QuickStartPage,
});

function CodeBlock({ code }: { code: string }) {
  return (
    <SyntaxHighlighter
      language="bash"
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


function QuickStartPage() {
  const cliCode = [
    'npx create-react-serve my-app',
    'cd my-app',
    'npm install',
    'npm run dev',
  ].join('\n');

  const manualCode = [
    'npm install react-serve-js react',
    'npm install -D typescript tsx @types/react',
    '',
    '# Create tsconfig.json and src/index.tsx (see below)',
  ].join('\n');

  const exampleCode = [
    'import {',
    '  App,',
    '  Route,',
    '  RouteGroup,',
    '  Middleware,',
    '  Response,',
    '  useRoute,',
    '  useSetContext,',
    '  useContext,',
    '  serve,',
    '  type MiddlewareFunction,',
    "} from \"react-serve-js\";\n", 
    'const mockUsers = [',
    '  { id: 1, name: "John Doe", email: "john@example.com" },',
    '  { id: 2, name: "Jane Smith", email: "jane@example.com" },',
    '  { id: 3, name: "Bob Johnson", email: "bob@example.com" },',
    '];\n',
    'const loggingMiddleware: MiddlewareFunction = (req, next) => {',
    '  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);',
    '  useSetContext("timestamp", Date.now());',
    '  return next();',
    '};\n',
    'function Backend() {',
    '  return (',
    '    <App port={6969}>',
    '      <Route path="/" method="GET">',
    '        {async () => {',
    '          return <Response json={{ message: "Welcome to ReactServe!" }} />;',
    '        }}',
    '      </Route>',
    '      <RouteGroup prefix="/api">',
    '        <Middleware use={loggingMiddleware} />',
    '        <Route path="/users" method="GET">',
    '          {async () => {',
    '            const timestamp = useContext("timestamp");',
    '            return (',
    '              <Response',
    '                json={{',
    '                  users: mockUsers,',
    '                  requestedAt: timestamp,',
    '                }}',
    '              />',
    '            );',
    '          }}',
    '        </Route>',
    '        <Route path="/users/:id" method="GET">',
    '          {async () => {',
    '            const { params } = useRoute();',
    '            const timestamp = useContext("timestamp");',
    '            const user = mockUsers.find((u) => u.id === Number(params.id));',
    '            return user ? (',
    '              <Response json={{ ...user, requestedAt: timestamp }} />',
    '            ) : (',
    '              <Response status={404} json={{ error: "User not found" }} />',
    '            );',
    '          }}',
    '        </Route>',
    '        <Route path="/health" method="GET">',
    '          {async () => {',
    '            const timestamp = useContext("timestamp");',
    '            return (',
    '              <Response',
    '                json={{',
    '                  status: "OK",',
    '                  timestamp: new Date().toISOString(),',
    '                  requestedAt: timestamp,',
    '                }}',
    '              />',
    '            );',
    '          }}',
    '        </Route>',
    '      </RouteGroup>',
    '    </App>',
    '  );',
    '}',
    '',
    'serve(Backend());',
  ].join('\n');

  return (
    <div className="space-y-10">
      <h1 className="text-xl mb-2">Quick Start</h1>
      <section>
        <h2 className="text-base mb-2 text-zinc-300">Using the CLI (Recommended)</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-400">
          <li>Run the following command to scaffold a new project:</li>
        </ol>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4 my-2">
          <CodeBlock code={cliCode} />
        </div>
        <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-400" start={2}>
          <li>Follow the prompts, then <code>cd</code> into your new folder and install dependencies.</li>
          <li>Start the dev server with <code>npm run dev</code>.</li>
        </ol>
      </section>
      <section>
        <h2 className="text-base mb-2 text-zinc-300">Manual Setup</h2>
        <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-400">
          <li>Install dependencies:</li>
        </ol>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4 my-2">
          <CodeBlock code={manualCode} />
        </div>
        <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-400" start={2}>
          <li>Create a <code>tsconfig.json</code> and <code>src/index.tsx</code> (see below for example).</li>
          <li>Start the dev server with <code>npx tsx --watch src/index.tsx</code>.</li>
        </ol>
      </section>
      <section>
        <h2 className="text-base mb-2 text-zinc-300">Example <code>src/index.tsx</code></h2>
        <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5 p-4 my-2">
          <SyntaxHighlighter language="tsx" style={tomorrow} customStyle={{ background: "transparent", padding: 0, margin: 0, fontSize: "0.95rem", borderRadius: "0.5rem" }}>{exampleCode}</SyntaxHighlighter>
        </div>
      </section>
    </div>
  );
}
