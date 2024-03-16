const siteMetadata = {
  title: "あにめーに",
  author: "ふぐお",
  headerTitle: "あにめーに",
  description:
    "ニコニコで最も旬なアニメ(アニメーニ)が分かる!そんなサイトです。各アニメの再生数やコメント数、マイリスト数をランキング形式やグラフで分析することができます。",
  language: "ja",
  theme: "system", // system, dark or light
  siteUrl: "https://animeini.com",
  siteRepo: "https://github.com/boxfish-jp/NicoAniAnalyticsFront",
  siteLogo: "/ogp.jfif",
  socialBanner: "/ogp.jfif",
  email: "fuguo892@gmail.com",
  github: "https://github.com/boxfish-jp/",
  twitter: "https://twitter.com/boxfish_jp",
  locale: "ja",
  analytics: {
    // If you want to use an analytics provider you have to add it to the
    // content security policy in the `next.config.js` file.
    // supports Plausible, Simple Analytics, Umami, Posthog or Google Analytics.
    //umamiAnalytics: {
    // We use an env variable for this site to avoid other users cloning our analytics ID
    // umamiWebsiteId: process.env.NEXT_UMAMI_ID, // e.g. 123e4567-e89b-12d3-a456-426614174000
    //},
    // plausibleAnalytics: {
    //   plausibleDataDomain: '', // e.g. tailwind-nextjs-starter-blog.vercel.app
    // },
    // simpleAnalytics: {},
    // posthogAnalytics: {
    //   posthogProjectApiKey: '', // e.g. 123e4567-e89b-12d3-a456-426614174000
    // },
    // googleAnalytics: {
    //   googleAnalyticsId: '', // e.g. G-XXXXXXX
    // },
  },
};

export default siteMetadata;
