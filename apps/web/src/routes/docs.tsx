import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/docs')({
  component: RouteComponent,
})




const sidebarGroups = [
  {
    group: "Getting Started",
    links: [
      { label: "At a Glance" },
      { label: "Quick Start" },
      { label: "Key Concepts" },
    ],
  },
  {
    group: "Components",
    links: [
      { label: "App" },
      { label: "Route" },
      { label: "RouteGroup" },
      { label: "Middleware" },
      { label: "Response" },
    ],
  },
  {
    group: "Hooks",
    links: [
      { label: "useRoute" },
      { label: "useSetContext" },
      { label: "useContext" },
    ],
  },
  {
    group: "Tutorial",
    links: [
      { label: "Full Walkthrough" },
    ],
  },
];

import { Link, useRouter } from '@tanstack/react-router';

function getFlatLinks() {
  return sidebarGroups.flatMap(group => group.links.map(link => link.label));
}

function getCurrentIndex(router) {
  const flatLinks = getFlatLinks();
  const current = router.state.location.pathname.split('/').pop();
  const idx = flatLinks.findIndex(
    l => l.toLowerCase().replace(/\s+/g, '-') === (current || '').toLowerCase().replace(/\s+/g, '-')
  );
  return idx;
}

function RouteComponent() {
  const router = useRouter();
  const flatLinks = getFlatLinks();
  const idx = getCurrentIndex(router);
  const prev = idx > 0 ? flatLinks[idx - 1] : null;
  const next = idx < flatLinks.length - 1 ? flatLinks[idx + 1] : null;

  function toPath(label) {
    return '/docs/' + label.toLowerCase().replace(/\s+/g, '-');
  }

  return (
    <div className="flex min-h-screen max-w-7xl mx-auto">
      <div className="w-64 border-r border-white/10 bg-black/80 p-6 pt-10 sticky top-0 h-screen">
        <div className="font-bold text-lg mb-8">Docs</div>
        <div className="space-y-6">
          {sidebarGroups.map((group) => (
            <div key={group.group}>
              <div className="uppercase text-xs text-zinc-500 font-semibold mb-2 tracking-widest">{group.group}</div>
              <div className="space-y-1 ml-2">
                {group.links.map((link) => (
                  <div
                    key={link.label}
                    className="block text-zinc-300 hover:text-white py-1 px-2 rounded transition-colors cursor-pointer text-sm"
                  >
                    {link.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex-1 p-10 prose prose-invert max-w-4xl mx-auto flex flex-col justify-between" style={{ background: "rgba(0,0,0,0.95)" }}>
        <div>
          <Outlet />
        </div>
        <div className="flex justify-between mt-12 pt-8 border-t border-white/10">
          {prev ? (
            <Link to={toPath(prev)} className="text-sm text-zinc-400 hover:text-white transition-colors">← {prev}</Link>
          ) : <span />}
          {next ? (
            <Link to={toPath(next)} className="text-sm text-zinc-400 hover:text-white transition-colors">{next} →</Link>
          ) : <span />}
        </div>
      </div>
    </div>
  );
}
