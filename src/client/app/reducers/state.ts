import {AppState, BackendState, FrontendState} from "./index";

const frontend: FrontendState = {
  user: "yichenxing"
};

const backend: BackendState = {
  users: {
    yichenxing: {
      name: "Yichen Xing",
      description: "Hacker with a heart of bitcoin",
      subscriptions: ["c/thestartup"],
      publications: [],
      posts: [
        "rep/pitching-for-your-first-check",
        "highlight/pitching-for-your-first-check",
        "comment/pitching-for-your-first-check",
        "comment/raising-capital",
      ],
    },
    annmiuroko: {
      name: "Ann Miuro-Ko",
      description: "Investing Ninja in @Lyft, @xamarinhq, @Refinery29, @Ayasdi, PhD, Yale investment committee member, Professional Eater, Mom to 3 rascals",
      subscriptions: [],
      publications: [],
      posts: [],
    },
    timferriss: {
      name: "Tim Ferriss",
      description: "",
      subscriptions: [],
      publications: [],
      posts: [],
    },
    parulsingh: {
      name: "Parul Singh",
      description: "early stage VC @fcollective. lover of startups, UX+ product management. forever founder. proud investor @pillpack @workjam @asklorem @adhawk @smallsforsmalls",
      subscriptions: [],
      publications: ["c/thestartup"],
      posts: [
        "p/raising-capital",
        "p/pitching-for-your-first-check",
        "p/the-art-of-the-lazy"
      ],
    }
  },
  collections: {
    yichenxing: {
      name: "Yichen Xing",
      description: "Yichen's Personal Collection",
      posts: [],
    },
    thestartup: {
      name: "The Startup",
      description: "Medium’s largest entrepreneurship publication followed by 296,127+ people.",
      posts: ["p/r/aising-capital", "p/pitching-for-your-first-check", "p/the-art-of-the-lazy"],
    },
    womenofsiliconvalley: {
      name: "Women of Silicon Valley",
      description: "Celebrating accomplished women and genderqueer folks in tech",
      posts: [],
    },
    medium: {
      name: "Medium",
      description: "We’ll deliver the best stories and ideas on the topics you care about most straight to your homepage, app, or inbox.",
      posts: [],
    },
    startups: {
      posts: [],
    },
    technology: {
      posts: [],
    },
  },
  posts: {
    // the startup posts
    "raising-capital": {
      medium: "m/https://medium.com/swlh/raising-capital-for-the-first-time-heres-how-to-do-it-successfully-c07ccbb4196",
      type: "publish",
    },
    "pitching-for-your-first-check": {
      medium: "m/https://medium.com/swlh/pitching-for-your-first-check-here-are-five-brilliant-women-investors-you-should-know-d7985cf9b9ac",
      type: "publish",
    },
    "the-art-of-the-lazy": {
      medium: "m/https://medium.com/swlh/the-art-of-the-lazy-product-manager-fc6e5385a00b",
      type: "publish",
    },
    // yichen stuff
    "rep/pitching-for-your-first-check": {
      medium: "m/https://medium.com/swlh/pitching-for-your-first-check-here-are-five-brilliant-women-investors-you-should-know-d7985cf9b9ac",
      type: "rep",
    },
    "highlight/pitching-for-your-first-check": {
      medium: "m/https://medium.com/swlh/pitching-for-your-first-check-here-are-five-brilliant-women-investors-you-should-know-d7985cf9b9ac",
      type: "highlight",
    },
    "comment/pitching-for-your-first-check": {
      medium: "m/https://medium.com/swlh/pitching-for-your-first-check-here-are-five-brilliant-women-investors-you-should-know-d7985cf9b9ac",
      type: "comment",
    },
    // raising capital comment: "Building an asset not a business (or a product)"
    "comment/raising-capital": {
      medium: "m/https://medium.com/swlh/raising-capital-for-the-first-time-heres-how-to-do-it-successfully-c07ccbb4196",
      type: "comment",
    },
    // the art of the lazy product manager: conclusion
  },
  media: {
    "https://medium.com/swlh/raising-capital-for-the-first-time-heres-how-to-do-it-successfully-c07ccbb4196": {
      title: "Raising Capital For The First Time? Here’s How To Do It Successfully",
      description: "6 important questions every entrepreneur should answer, whether you’re pre-product, or bootstrapped and profitable.",
      url: "https://medium.com/swlh/raising-capital-for-the-first-time-heres-how-to-do-it-successfully-c07ccbb4196",
      source: "c/thestartup",
      creator: "u/parulsingh",
      links: [],
      posts: ["comment/raising-capital"],
    },
    "https://medium.com/swlh/pitching-for-your-first-check-here-are-five-brilliant-women-investors-you-should-know-d7985cf9b9ac": {
      title: "Pitching for Your First Check? Here are Five Brilliant Women Investors You Should Know",
      description: "Early investors are rare, ones who add value even rarer.",
      url: "https://medium.com/swlh/pitching-for-your-first-check-here-are-five-brilliant-women-investors-you-should-know-d7985cf9b9ac",
      source: "c/thestartup",
      creator: "u/parulsingh",
      links: ["u/jennyfielding", "u/sorayadarabi", "u/nimikatragadda", "u/nicolestata", "u/elizabethyin"],
      posts: ["rep/pitching-for-your-first-check", "highlight/pitching-for-your-first-check", "comment/pitching-for-your-first-check"],
    },
    "https://medium.com/swlh/the-art-of-the-lazy-product-manager-fc6e5385a00b": {
      title: "The Art of the Lazy Product Manager",
      description: "Why high growth startups need to build less, not more.",
      url: "https://medium.com/swlh/the-art-of-the-lazy-product-manager-fc6e5385a00b",
      source: "c/thestartup",
      creator: "u/parulsingh",
      links: [],
      posts: [],
    },
    "https://medium.com/women-of-silicon-valley/10-questions-with-ann-miura-ko-1aad12e00d07": {
      title: "10 Questions with Ann Miura-Ko",
      description: "Cofounding Partner at Floodgate",
      url: "https://medium.com/women-of-silicon-valley/10-questions-with-ann-miura-ko-1aad12e00d07",
      source: "c/medium",
      creator: "c/womenofsiliconvalley",
      links: ["u/annmiuroko"],
      posts: [],
    },
  }
};

export const INITIAL_STATE: AppState = {
  backend,
  frontend
};
