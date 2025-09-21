export function FaqSection() {
  const parseAnswer = (text: string | undefined) => {
    if (!text || typeof text !== "string") return text;
    const parts = text.split(/(`[^`]*`|\[(?:[^\]]+)\]\((?:[^)]+)\))/g);
    return parts.map((part, index) => {
      if (!part) return "";
      if (part.startsWith("`") && part.endsWith("`")) {
        const code = part.slice(1, -1);
        return (
          <code key={index} className="bg-white/10 px-1 rounded">
            {code}
          </code>
        );
      } else if (part.startsWith("[")) {
        const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (match) {
          const linkText = match[1];
          const url = match[2];
          return (
            <a key={index} href={url} className="underline" target="_blank">
              {linkText}
            </a>
          );
        }
      }
      return part;
    });
  };

  const faqs = [
    {
      question: "WTF is this?",
      answer:
        "ReactServe is a backend framework that transforms JSX components into Express.js routes. You write your API using React-like syntax with components like `<App />`, `<Route />`, and `<Middleware />`. The framework processes your JSX tree at runtime, extracts route definitions, and creates an Express server. It includes hooks like `useRoute()` and `useContext()` for accessing request data and sharing state between middleware.",
    },
    {
      question: "Is this secure?",
      answer: "Yes. It doesn't run in the browser. You're fine.",
    },
    {
      question: "Why does this exist?",
      answer: "[@xing_titanium](https://x.com/xing_titanium) was bored.",
    },
  ];

  return (
    <div className="mt-42">
      <h1 className="text-5xl font-light text-center">FAQ.</h1>
      <div className="max-w-4xl mx-auto mt-12 px-8 space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-t border-b border-white/10 p-8">
            <h3 className="text-2xl font-light mb-4">{faq.question}</h3>
            <p className="text-zinc-400 leading-relaxed">
              {parseAnswer(faq.answer)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
