import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'

// Changelog data structure
interface ChangelogEntry {
  version: string
  features: {
    added?: string[]
    changed?: string[]
    fixed?: string[]
    removed?: string[]
  }
}

const changelogData: ChangelogEntry[] = [
  {
    version: "0.5.1",
    features: {
      added: [
        "Support for major HTTP methods (POST, PUT, PATCH, DELETE, OPTIONS, HEAD) in addition to GET.",
      ],
      fixed: [
        "Routes with non-GET methods now work properly.",
      ]
    }
  },
  {
    version: "0.5.0",
    features: {
      added: [
        "Support for arrays of middleware functions in the <Middleware> component's use prop.",
      ]
    }
  },
  {
    version: "0.4.0",
    features: {
      added: [
        "CORS configuration via <App /> component."
      ]
    }
  },
  {
    version: "0.3.0",
    features: {
      added: [
        "Context management using the useContext and useSetContext hooks."
      ]
    }
  },
  {
    version: "0.2.0",
    features: {
      added: [
        "<RouteGroup /> component."
      ]
    }
  },
  {
    version: "0.1.0",
    features: {
      added: [
        "Initial release."
      ]
    }
  }
]

function ChangelogsComponent() {
  const [selectedVersion, setSelectedVersion] = useState(changelogData[0])

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'added':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'changed':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'fixed':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      case 'removed':
        return 'bg-red-500/20 text-red-400 border-red-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const highlightText = (text: string) => {
    // Regex to match components like <ComponentName> and hooks like useHookName
    const componentAndHookRegex = /(<[A-Z][a-zA-Z]*\s*\/>|<[A-Z][a-zA-Z]*>|use[A-Z][a-zA-Z]*)/g;
    
    const parts = text.split(componentAndHookRegex);
    
    return parts.map((part, index) => {
      if (componentAndHookRegex.test(part)) {
        return (
          <span 
            key={index} 
            className="bg-blue-500/20 text-blue-300 px-1 py-0.5 rounded font-mono text-sm"
          >
            {part}
          </span>
        );
      }
      return part;
    });
  }

  return (
    <div className="h-screen bg-black text-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 h-full">
        {/* Version List - Left Side */}
        <div className="p-6 border-r border-white/10 h-full overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-gray-300">Versions</h2>
            <div className="space-y-2">
              {changelogData.map((entry) => (
                <button
                  key={entry.version}
                  onClick={() => setSelectedVersion(entry)}
                  className={`w-full text-left p-3 border transition-all duration-200 ${
                    selectedVersion.version === entry.version
                      ? 'border-white/30 text-white'
                      : 'border-white/10 text-gray-400 hover:border-white/20'
                  }`}
                >
                  <div className="font-semibold">v{entry.version}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Features List - Right Side */}
          <div className="p-6 h-full overflow-y-auto">
          <div className="p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">
                Version {selectedVersion.version}
              </h2>
            </div>

            <div className="space-y-6">
              {Object.entries(selectedVersion.features).map(([type, items]) => (
                items && items.length > 0 && (
                  <div key={type}>
                    <div className="flex items-center gap-2 mb-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded border capitalize ${getBadgeColor(type)}`}
                      >
                        {type}
                      </span>
                    </div>
                    <ul className="space-y-2 ml-4">
                      {items.map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-white/60 mt-2 flex-shrink-0" />
                          <span className="text-gray-300 leading-relaxed">{highlightText(item)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              ))}
            </div>

            {/* GitHub Link */}
            {/* <div className="mt-8 pt-6 border-t border-white/10">
              <a
                href={`https://github.com/akinloluwami/react-serve/releases/tag/v${selectedVersion.version}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                    clipRule="evenodd"
                  />
                </svg>
                View release on GitHub
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/changelogs')({
  component: ChangelogsComponent,
})
