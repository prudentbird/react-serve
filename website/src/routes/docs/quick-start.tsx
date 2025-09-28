import { createFileRoute } from '@tanstack/react-router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Route = createFileRoute('/docs/quick-start')({
  component: QuickStartPage,
});

function CodeBlock({ code, language = 'bash' }: { code: string; language?: string }) {
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
  'import { App, Route, Response, serve } from "react-serve-js";',
  '',
  'function Backend() {',
  '  return (',
  '    <App port={6969}>',
  '      <Route path="/" method="GET">',
  '        {() => <Response json={{ message: "Hello from ReactServe!" }} />}',
  '      </Route>',
  '    </App>',
  '  );',
  '}',
  '',
  'serve(Backend());',
].join('\n');

function QuickStartPage() {
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
          <CodeBlock code={exampleCode} language="tsx" />
        </div>
      </section>
    </div>
  );
}
