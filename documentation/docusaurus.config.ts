import { Options, ThemeConfig } from "@docusaurus/preset-classic";
import { Config } from "@docusaurus/types";
import "prism-react-renderer";
import darkCodeTheme from "prism-react-renderer/themes/dracula";
import lightCodeTheme from "prism-react-renderer/themes/github";

const organizationName = "ZSB Rybnik";
const githubLink = "https://github.com/ZSBRybnik/backend";

const config: Config = {
  title: `${organizationName} Documentation`,
  tagline: `${organizationName} Documentation`,
  url: "https://documentation.zsbrybnik.pl",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName,
  projectName: organizationName,
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  plugins: [
    require.resolve("@cmfcmf/docusaurus-search-local"),
    require.resolve("plugin-image-zoom"),
  ],
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          editUrl: githubLink,
        },
      } as Options,
    ],
  ],
  themeConfig: {
    navbar: {
      title: organizationName,
      logo: {
        alt: organizationName,
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Dokumentacja",
        },
        {
          href: githubLink,
          label: "GitHub",
          position: "right",
        },
      ],
    } as ThemeConfig,
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Dokumentacja",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "Stack Overflow",
              href: "https://stackoverflow.com/questions/tagged/docusaurus",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "Twitter",
              href: "https://twitter.com/docusaurus",
            },
            {
              href: "https://www.facebook.com/rybnikzsb",
              label: "Facebook",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: githubLink,
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} ${organizationName}`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
};

export default config;
