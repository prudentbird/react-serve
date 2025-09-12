export function FaqSection() {
  return (
    <div className="mt-42">
      <h1 className="text-5xl font-light text-center">FAQ.</h1>
      <div className="max-w-4xl mx-auto mt-12 px-8 space-y-6">
        <div className="border-t border-b border-white/10 p-8">
          <h3 className="text-2xl font-light mb-4">WTF is this?</h3>
          <p className="text-zinc-400 leading-relaxed">
            ReactServe is a backend framework that transforms JSX components
            into Express.js routes. You write your API using React-like syntax
            with components like{" "}
            <code className="bg-white/10 px-1 rounded">&lt;App&gt;</code>,
            <code className="bg-white/10 px-1 rounded">&lt;Route&gt;</code>,
            and{" "}
            <code className="bg-white/10 px-1 rounded">
              &lt;Middleware&gt;
            </code>
            . The framework processes your JSX tree at runtime, extracts route
            definitions, and creates an Express server. It includes hooks like{" "}
            <code className="bg-white/10 px-1 rounded">useRoute()</code> and
            <code className="bg-white/10 px-1 rounded">useContext()</code> for
            accessing request data and sharing state between middleware.
          </p>
        </div>
        <div className="border-t border-b border-white/10 p-8">
          <h3 className="text-2xl font-light mb-4">Is this secure?</h3>
          <p className="text-zinc-400 leading-relaxed">
            Yes. It doesn't run in the browser. You're fine.
          </p>
        </div>
        <div className="border-t border-b border-white/10 p-8">
          <h3 className="text-2xl font-light mb-4">Why does this exist?</h3>
          <p className="text-zinc-400 leading-relaxed">
            <a
              href="https://x.com/xing_titanium"
              target="_blank"
              className="underline"
            >
              @xing_titanium
            </a>{" "}
            
            was bored.
          </p>
        </div>
      </div>
    </div>
  );
}
