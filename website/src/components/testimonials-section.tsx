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
there are some ideas that shouldn't even be conceived, talk less of being implemented

please, for the love of God, do not continue this project
  `,
    link: "https://x.com/a1s0sa/status/1955755685715591195",
  },
];

export function TestimonialsSection() {
  return (
    <div className="my-42">
      <h1 className="text-5xl font-light text-center">
        Developers <span className="text-pink-500 cursive">love</span> ReactServe!
      </h1>
      <div className="max-w-6xl mx-auto mt-12 px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonialTweets.map((tweet, index) => (
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
  );
}
