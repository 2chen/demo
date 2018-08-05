import {AppState, BackendState, FrontendState} from "./redux";

const frontend: FrontendState = {
  user: "u/yichenxing",
  breadcrumbs: [],
  searchControlState: {
    type: "both",
    mediaFilters: ["comment", "article", "podcast"],
    goodnessSlider: 50,
    newnessSlider: 50,
    lengthSlider: 50,
  }
};

const backend: BackendState = {
  users: {
    yichenxing: {
      name: "Yichen Xing",
      description: "Hacker with a heart of bitcoin",
      subscriptions: [
        {noun: "reader", of: "c/thestartup"},
        {noun: "fan", of: "u/timferriss"},
        {noun: "crippling addict", of: "c/coffee"}
      ],
      publications: [{noun: "curator", of: "c/erasmus"}],
      posts: [
        "p/rep/pitching-for-your-first-check",
        "p/highlight/pitching-for-your-first-check",
        "p/comment/pitching-for-your-first-check",
        "p/comment/raising-capital",
        "p/rep/the-art-of-the-lazy",
      ],
      quirks: {
        reputation: "Rascal",
        hearts: 0,
        heartsGiven: 2,
        verified: true,
      },
      icon: "yichenxing.png",
    },
    annmiuroko: {
      name: "Ann Miuro-Ko",
      description: "Investing Ninja in @Lyft, @xamarinhq, @Refinery29, @Ayasdi, PhD, Yale investment committee member, Professional Eater, Mom to 3 rascals",
      subscriptions: [],
      publications: [],
      posts: [],
      quirks: {
        reputation: "Virtuoso",
        hearts: 1,
        heartsGiven: 0,
        verified: false,
      },
    },
    timferriss: {
      name: "Tim Ferriss",
      description: "",
      subscriptions: [],
      publications: [],
      posts: [],
      quirks: {
        reputation: "Guru",
        hearts: 1,
        heartsGiven: 0,
        verified: false,
      },
    },
    parulsingh: {
      name: "Parul Singh",
      description: "early stage VC @fcollective. lover of startups, UX+ product management. forever founder. proud investor @pillpack @workjam @asklorem @adhawk @smallsforsmalls",
      subscriptions: [],
      publications: [{noun: "contributor", of: "c/thestartup"}],
      posts: [
        "p/publish/raising-capital",
        "p/publish/pitching-for-your-first-check",
        "p/publish/the-art-of-the-lazy"
      ],
      quirks: {
        reputation: "Sage",
        hearts: 1,
        heartsGiven: 0,
        verified: false,
      },
    }
  },
  collections: {
    yichenxing: {
      name: "Yichen Xing",
      description: "Yichen's Personal Collection",
      posts: [],
    },
    erasmus: {
      name: "erasm.us",
      description: "hottest monk/startup since 1536",
      posts: [

      ],
    },
    thestartup: {
      name: "The Startup",
      description: "Medium’s largest entrepreneurship publication followed by 296,127+ people.",
      posts: [
        "p/publish/raising-capital",
        "p/publish/pitching-for-your-first-check",
        "p/publish/the-art-of-the-lazy"
      ],
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
      name: "Startups",
      description: "",
      posts: [],
    },
    technology: {
      name: "Technology",
      description: "",
      posts: [],
    },
  },
  posts: {
    // the startup posts
    "publish/raising-capital": {
      medium: "m/https://medium.com/swlh/raising-capital-for-the-first-time-heres-how-to-do-it-successfully-c07ccbb4196",
      type: "publish",
    },
    "publish/pitching-for-your-first-check": {
      medium: "m/https://medium.com/swlh/pitching-for-your-first-check-here-are-five-brilliant-women-investors-you-should-know-d7985cf9b9ac",
      type: "publish",
    },
    "publish/the-art-of-the-lazy": {
      medium: "m/https://medium.com/swlh/the-art-of-the-lazy-product-manager-fc6e5385a00b",
      type: "publish",
    },
    // yichen stuff
    "rep/pitching-for-your-first-check": {
      medium: "m/https://medium.com/swlh/pitching-for-your-first-check-here-are-five-brilliant-women-investors-you-should-know-d7985cf9b9ac",
      type: "rep",
      metadata: "rep",
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
    "rep/the-art-of-the-lazy": {
      medium: "m/https://medium.com/swlh/the-art-of-the-lazy-product-manager-fc6e5385a00b",
      type: "rep",
      metadata: "heart",
    },
  },
  media: {
    "https://medium.com/swlh/raising-capital-for-the-first-time-heres-how-to-do-it-successfully-c07ccbb4196": {
      name: "Raising Capital For The First Time? Here’s How To Do It Successfully",
      description: "6 important questions every entrepreneur should answer, whether you’re pre-product, or bootstrapped and profitable.",
      url: "https://medium.com/swlh/raising-capital-for-the-first-time-heres-how-to-do-it-successfully-c07ccbb4196",
      source: "c/thestartup",
      creator: "u/parulsingh",
      links: [],
      posts: ["comment/raising-capital"],
      type: "article",
    },
    "https://medium.com/swlh/pitching-for-your-first-check-here-are-five-brilliant-women-investors-you-should-know-d7985cf9b9ac": {
      name: "Pitching for Your First Check? Here are Five Brilliant Women Investors You Should Know",
      description: "Early investors are rare, ones who add value even rarer.",
      url: "https://medium.com/swlh/pitching-for-your-first-check-here-are-five-brilliant-women-investors-you-should-know-d7985cf9b9ac",
      source: "c/thestartup",
      creator: "u/parulsingh",
      links: ["u/jennyfielding", "u/sorayadarabi", "u/nimikatragadda", "u/nicolestata", "u/elizabethyin"],
      posts: ["rep/pitching-for-your-first-check", "highlight/pitching-for-your-first-check", "comment/pitching-for-your-first-check"],
      type: "article",
    },
    "https://medium.com/swlh/the-art-of-the-lazy-product-manager-fc6e5385a00b": {
      name: "The Art of the Lazy Product Manager",
      description: "Why high growth startups need to build less, not more.",
      url: "https://medium.com/swlh/the-art-of-the-lazy-product-manager-fc6e5385a00b",
      source: "c/thestartup",
      creator: "u/parulsingh",
      links: [],
      posts: [],
      type: "article",
    },
    "https://medium.com/women-of-silicon-valley/10-questions-with-ann-miura-ko-1aad12e00d07": {
      name: "10 Questions with Ann Miura-Ko",
      description: "Cofounding Partner at Floodgate",
      url: "https://medium.com/women-of-silicon-valley/10-questions-with-ann-miura-ko-1aad12e00d07",
      source: "c/medium",
      creator: "c/womenofsiliconvalley",
      links: ["u/annmiuroko"],
      posts: [],
      type: "article",
    },
  }
};

export const INITIAL_STATE: AppState = {
  backend,
  frontend
};
