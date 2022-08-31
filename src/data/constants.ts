// 站内导航枚举开始
const FRONTEND = "Frontend";
const MARKDOWN = "Markdown";
const HTML = "HTML";
const CSS = "CSS";
const JAVASCRIPT = "JavaScript";
const TYPESCRIPT = "TypeScript";
const REACT = "React";
const DOCUSAURUS = "Docusaurus";
const TAILWIND = "Tailwind";
const SASS = "Sass";
const WEXIN_MINIPROGRAM = "微信小程序";
const NPM = "npm";
const YARN = "Yarn";
const VITE = "Vite";
const GRAPHQL = "GraphQL";
const BACKEND = "Backend";
const CSHARP = "C#";
const GO = "Go";
const NODE_JS = "Node.js";
const POSTGRESQL = "PostgreSQL";
const MICROSOFT_SQLSERVER = "Microsoft SQL Server"; // Microsoft SQL Server
const MONGODB = "MongoDB";
const COSMOSDB = "CosmosDB";
const REDIS = "Redis";
const VERCEL = "Vercel";
const MICROSOFT_AZURE = "Microsoft Azure"; // Microsoft Azure
const OTHERS = "Others";
const GIT = "Git";
const GITHUB = "GitHub";
const YAML = "YAML";
const POWERSHELL = "PowerShell";
const VISUAL_STUDIO_CODE = "Visual Studio Code";
const VISUAL_STUDIO = "Visual Studio";
const RIDER = "Rider";
const WEBSTORM = "WebStorm";
const WECHAT_DEV_TOOLS = "微信开发者工具";
const FIGMA = "Figma";
const LINKS = "Links"

interface AllMenuData {
  readonly frontend: string;
  readonly markdown: string;
  readonly html: string;
  readonly css: string;
  readonly javascript: string;
  readonly typescript: string;
  readonly react: string;
  readonly docusaurus: string;
  readonly tailwind: string;
  readonly sass: string;
  readonly wexinMiniprogram: string;
  readonly npm: string;
  readonly yarn: string;
  readonly vite: string;
  readonly graphql: string;
  readonly backend: string;
  readonly csharp: string;
  readonly go: string;
  readonly nodejs: string;
  readonly postgresql: string;
  readonly microsoft_sqlserver: string;
  readonly mongodb: string;
  readonly cosmosdb: string;
  readonly redis: string;
  readonly vercel: string;
  readonly azure: string;
  readonly others: string;
  readonly git: string;
  readonly github: string;
  readonly yaml: string;
  readonly powershell: string;
  readonly visual_studio_code: string;
  readonly visual_studio: string;
  readonly rider: string;
  readonly webstorm: string;
  readonly wechat_dev_tools: string;
  readonly figma: string;
  readonly links: string;
}

const allMenuData: AllMenuData = {
  frontend: FRONTEND,
  markdown: MARKDOWN,
  html: HTML,
  css: CSS,
  javascript: JAVASCRIPT,
  typescript: TYPESCRIPT,
  react: REACT,
  docusaurus: DOCUSAURUS,
  tailwind: TAILWIND,
  sass: SASS,
  wexinMiniprogram: WEXIN_MINIPROGRAM,
  npm: NPM,
  yarn: YARN,
  vite: VITE,
  graphql: GRAPHQL,
  backend: BACKEND,
  csharp: CSHARP,
  go: GO,
  nodejs: NODE_JS,
  postgresql: POSTGRESQL,
  microsoft_sqlserver: MICROSOFT_SQLSERVER,
  mongodb: MONGODB,
  cosmosdb: COSMOSDB,
  redis: REDIS,
  vercel: VERCEL,
  azure: MICROSOFT_AZURE,
  others: OTHERS,
  git: GIT,
  github: GITHUB,
  yaml: YAML,
  powershell: POWERSHELL,
  visual_studio_code: VISUAL_STUDIO_CODE,
  visual_studio: VISUAL_STUDIO,
  rider: RIDER,
  webstorm: WEBSTORM,
  wechat_dev_tools: WECHAT_DEV_TOOLS,
  figma: FIGMA,
  links:LINKS
};
// 站内导航枚举结束

// 联系我枚举开始
const github = "Github"
const email = "Email";
const wechat = "WeChat";
const GITHUB_LINK = "https://github.com/hyodage";
const EMAIL_ADDRESS = "lxs2048@sina.com";
const WECHAT_ACCOUNT = "hyodage";

interface ContactMeData {
  readonly github: string;
  readonly email: string;
  readonly wechat: string;
  readonly githubLink: string;
  readonly emailAddress: string;
  readonly wechatAccount: string;
}

const contactMeData: ContactMeData = {
  github: github,
  email: email,
  wechat: wechat,
  githubLink: GITHUB_LINK,
  emailAddress: EMAIL_ADDRESS,
  wechatAccount: WECHAT_ACCOUNT,
};
// 联系我枚举结束

export { allMenuData, contactMeData };
