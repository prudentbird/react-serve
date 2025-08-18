import { createFileRoute, Link } from "@tanstack/react-router";
import { SiGithub, SiReact } from "react-icons/si";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const testimonialTweets = [
    {
      image:"https://res.cloudinary.com/plaything/image/upload/v1755294252/react-serve/NBhCKTaY_400x400_d2tsi6.jpg",
      name:"manofletters",
      handle: "@_manofletters",
      content: "eww",
      link: "https://x.com/_manofletters/status/1956352135718637705",
    },
    {
      image: "https://res.cloudinary.com/plaything/image/upload/v1755294156/react-serve/ZwkgrSyK_400x400_u6hr3p.jpg",
      name: "WILL.I.AM💥",
      handle: "@williammgyasii",
      content: `
😭😭eiii noo no
    `,
      link: "https://x.com/williammgyasii/status/1955745685715591195",
    },
        {
      image: 'https://res.cloudinary.com/plaything/image/upload/v1755295130/react-serve/mNLiF1n8_400x400_oxzh6l.jpg',
      name: "pelumi",
      handle: "@pelumi_4evr",
      content: "This is cool but an abomination 😭",
      link: "https://x.com/pelumi_4evr/status/1955929800402469039",
    },
    {
      image: 'https://res.cloudinary.com/plaything/image/upload/v1755258876/react-serve/prBUtgtZ_400x400_n22lmq.jpg',
      name: "Jeffrey Agabaenwere",
      handle: "@Jeffreyonsui",
      content: "It works?",
      link: "https://x.com/Jeffreyonsui/status/1955957125294739738",
    },
    {
      image: 'https://res.cloudinary.com/plaything/image/upload/v1755258934/react-serve/Xfu7nMO9_400x400_on1fca.jpg',
      name: "FurankieSama",
      handle: "@FranklinNwokoma",
      content: "Why? Just why?",
      link: "https://x.com/FranklinNwokoma/status/1955648662627033540",
    },
    
    {
      image:"https://res.cloudinary.com/plaything/image/upload/v1755259006/react-serve/DWxMyAZj_400x400_pteg79.jpg" ,
      name: "Akinkunmi.",
      handle: "@xing_titanium",
      content: "I'm just bored.",
      link: "https://x.com/xing_titanium/status/1955648953564938710",
    },

    {
      image: "https://res.cloudinary.com/plaything/image/upload/v1755259120/react-serve/1wgSWw8c_400x400_mbeqbj.jpg",
      name: "Cruise Coder",
      handle: "@Itz_Steavean",
      content: "Why do I feel this is a bad idea? 😏😏",
      link: "https://x.com/Itz_Steavean/status/1955714882818445792",
    },
    {
      image: "https://res.cloudinary.com/plaything/image/upload/v1755260795/react-serve/YlQ5TuGK_400x400_wfweag.jpg",
      name: "CY",
      handle: "@CYB_dez",
      content: `
      As a certified React hater, this gives me the creeps.

As a developer though, I'm impressed.
      `,
      link: "https://x.com/CYB_dez/status/1955733143379726583",
    },

    {
      image: "https://pbs.twimg.com/profile_images/1699171193566183424/fZvBLE4q_400x400.jpg",
      name: "KvngCodes💫",
      handle: "@BriggSKvngZ",
      content: "Just because you can, doesn't mean you should😩",
      link: "https://x.com/BriggSKvngZ/status/1955964735871950907",
    },
    {
      image: "https://pbs.twimg.com/profile_images/1609288339886071809/FA1oXEAT_400x400.jpg",
      name: "Mayowa",
      handle: "@Craennie",
      content: "Mad mad 🔥",
      link: "https://x.com/Craennie/status/1956064690590634346",
    },
    {
      image: "https://pbs.twimg.com/profile_images/1919781496103096320/pouz3tC3_400x400.jpg",
      name: "Adigun Oreoluwa ☕️💻",
      handle: "@adis_akins",
      content: "How bored can  one be?",
      link: "https://x.com/adis_akins/status/1955981988633973001",
    },
    {
      image: "https://pbs.twimg.com/profile_images/1924910800612798464/Ln3ryHBB_400x400.jpg",
      name: "Code maniac",
      handle: "@Saggy_OT",
      content: "but why",
      link: "https://x.com/Saggy_OT/status/1955945833901314451",
    },
    {
      image: "https://res.cloudinary.com/plaything/image/upload/v1755258657/react-serve/MLfy6TUP_400x400_fgqfn2.jpg",
      name: "Dennis",
      handle: "@tigawanna",
      content: "@grok is this real",
      link: "https://x.com/tigawanna/status/1955972233303621639",
    },
    {
      image: "https://res.cloudinary.com/plaything/image/upload/v1755294054/react-serve/TLW-UIEK_400x400_fw7ru7.jpg",
      name: "𝖕𝖍𝖊𝖒𝖞™",
      handle: "@olaoluphemy",
      content: `
really impressive ngl. but this kind code go surely hunt me for dream 🤣
    `,
      link: "https://x.com/olaoluphemy/status/1955966854603657387",
    },
    {
      image: "https://res.cloudinary.com/plaything/image/upload/v1755259490/react-serve/fri6gQm9_400x400_jotkjo.jpg",
      name: "StephDev",
      handle: "@Horlharmighty1",
      content: `
This is sleek!!!. I love it
    `,
      link: "https://x.com/Horlharmighty1/status/1955730717612368120",
    },

    
    {
      image: "https://res.cloudinary.com/plaything/image/upload/v1755294100/react-serve/S9g7D1cq_400x400_z9nhog.jpg",
      name: "Aisosa",
      handle: "@a1s0sa",
      content: `
there are some ideas that shouldn’t even be conceived, talk less of being implemented

please, for the love of God, do not continue this project
    `,
      link: "https://x.com/a1s0sa/status/1955755685715591195",
    },
  ];

  const links = [
    {
      title: "docs",
      href: "/docs",
    },
    {
      title: "changelogs",
      href: "/changelogs",
    },
    {
      title: <SiGithub />,
      href: "https://github.com/akinloluwami/react-serve",
    },
  ];
  return (
    <div className="">
      <div className="border-b border-white/10 flex items-center justify-between h-14">
        <div className="px-4">ReactServe</div>
        <div className="flex items-center h-full">
          {links.map((link) => (
            <div
              key={link.href}
              className="border-l border-white/10 h-full flex px-4 items-center hover:bg-white/5 transition-colors"
            >
              <Link to={link.href}>{link.title}</Link>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center px-32 mt-40 gap-x-32">
        <div className="">
          <h2 className="text-5xl font-light">
            The missing backend <br /> framework for React.
          </h2>
          <div className="bg-white/5 border p-3 border-white/7 mt-5">
            <code className="text-sm">$ npx create-react-serve@latest</code>
          </div>
          <Link to="/">
            <button className="mt-5 bg-white text-black px-5 py-3 text-sm">
              Learn ReactServe
            </button>
          </Link>
        </div>
        <div className="p-4 ml-10 flex-1 border border-white/10">
          <div className="text-xs px-4 py-2 flex gap-x-1 items-center border border-white/10 w-fit bg-white/4">
            <SiReact size={14} color="#61DAFB" />
            <span className="text-zinc-400">backend.tsx</span>
          </div>
          <div className="ext-sm font-mono p-4 rounded-b-lg">
            <SyntaxHighlighter
              language="jsx"
              style={tomorrow}
              customStyle={{
                background: "transparent",
                padding: 0,
                margin: 0,
                fontSize: "0.875rem",
              }}
            >
              {`<App port={6969}>
  <Route path="/" method="GET">
    {async () => {
      return <Response json={{ message: "Hello World!" }} />;
    }}
  </Route>

  <RouteGroup prefix="/api">
    <Middleware use={authMiddleware} />

    <Route path="/users/:id" method="GET">
      {async () => {
        const { params } = useRoute();
        const user = useContext("user");
        return <Response json={{ userId: params.id, currentUser: user }} />;
      }}
    </Route>
  </RouteGroup>
</App>`}
            </SyntaxHighlighter>
          </div>
          <div className="mt-4 flex justify-end"></div>
        </div>
      </div>
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
      <div className="my-42">
        <h1 className="text-5xl font-light text-center">
          Developers <span className="text-pink-500 cursive">love</span> ReactServe!
        </h1>
        <div className="max-w-6xl mx-auto mt-12 px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonialTweets
             
              .map((tweet, index) => (
                <a
                  key={index}
                  href={tweet.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-white/10 p-6 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-10">
                      <img
                        src={tweet.image}
                        alt={tweet.name}
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                    <div>
                      <div className="font-medium text-sm">{tweet.name}</div>
                      <div className="text-zinc-400 text-xs">
                        {tweet.handle}
                      </div>
                    </div>
                  </div>
                  <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-line">
                    {tweet.content.trim()}
                  </p>
                </a>
              ))}
          </div>
        </div>
      </div>
      <div className="my-42">
        <div className="max-w-4xl mx-auto text-center px-8">
          <h2 className="text-4xl font-light mb-6">⭐ Star on GitHub</h2>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Either you think it's useful or cursed.
          </p>
          <a
            href="https://github.com/akinloluwami/react-serve"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 text-lg font-medium hover:bg-gray-100 transition-colors"
          >
            <SiGithub size={24} />
            Star on GitHub
          </a>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}
