// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion
require('dotenv').config();
const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const GITHUB_NAME = 'hyodage'
const PRO_NAME = 'Notes'
const PREFIX = 'blob/main'
const PRO_URL = `https://github.com/${GITHUB_NAME}/${PRO_NAME}/${PREFIX}`
const GITHUB_URL = `https://github.com/${GITHUB_NAME}`
const SITE_URL = 'https://blog.guiyexing.site'
const SITE_TITLE = '造极'
const SITE_TAG = '世间无常事，唯镜正衣冠'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: SITE_TITLE,
  tagline: SITE_TAG,
  url: SITE_URL,
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: GITHUB_NAME, // Usually your GitHub org/user name.
  projectName: PRO_NAME, // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN','en'],
    localeConfigs:{
      en:{
        label:'English'
      },
      'zh-CN':{
        label:'中文'
      }
    }
  },
  plugins: [
    'docusaurus-plugin-sass',
    'plugin-image-zoom'
  ],
  customFields:{
    authSourceCode:process.env.AUTHSOURCECODE
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:PRO_URL,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:PRO_URL,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.scss'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: SITE_TITLE,
        hideOnScroll: true,
        logo: {
          alt: 'My Site Logo',
          src: 'img/logosc62eccf4c.png',
        },
        items: [
          {
            type: 'doc',
            docId: '/category/部署',
            position: 'right',
            label: '分类专栏',
          },
          {to: '/blog', label: '博客', position: 'right'},
          {
            href: GITHUB_URL,
            className: 'header-github-link',
            position: 'right',
            'aria-label': 'Github repository'
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      announcementBar: {
        id: 'announcementBar-3', // Increment on change
        content:
          '<span aria-label="star" role="img" class="lg-screens-only">⭐</span> If you need any help, please contact us. Thanks for your support! <span aria-label="heart" role="img" class="lg-screens-only">❤️</span>',
      },
      footer: {
        style: 'light',
        copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      imageZoom: {
        // CSS selector to apply the plugin to, defaults to '.markdown img'
        selector: '.markdown img',
        // Optional medium-zoom options
        // see: https://www.npmjs.com/package/medium-zoom#options
        options: {
          margin: 24,
          background: '#BADA55',
          scrollOffset: 0,
          container: '#zoom-container',
          template: '#zoom-template',
        },
      },
    }),
};

module.exports = config;
