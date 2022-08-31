/* eslint-disable @typescript-eslint/no-explicit-any */
import markdown from "@site/static/img/icon/markdown.png";
import html from "@site/static/img/icon/html.png";
import css from "@site/static/img/icon/css.png";
import javascript from "@site/static/img/icon/javascript.png";
import typescript from "@site/static/img/icon/typescript.png";
import react from "@site/static/img/icon/react.png";
import docusaurus from "@site/static/img/icon/docusaurus.png";
import tailwindcss from "@site/static/img/icon/tailwindcss.png";
import sass from "@site/static/img/icon/sass.png";
import wexin_mini_program from "@site/static/img/icon/wexin_mini_program.png";
import npm from "@site/static/img/icon/npm.png";
import yarn from "@site/static/img/icon/yarn.png";
import vite from "@site/static/img/icon/vite.png";
import graphql from "@site/static/img/icon/graphql.png";

import csharp from "@site/static/img/icon/csharp.png";
import go from "@site/static/img/icon/go.png";
import nodejs from "@site/static/img/icon/nodejs.png";
import postgresql from "@site/static/img/icon/postgresql.png";
import microsoft_sqlserver from "@site/static/img/icon/microsoft_sqlserver.png";
import mongodb from "@site/static/img/icon/mongodb.png";
import cosmosdb from "@site/static/img/icon/cosmosdb.png";
import redis from "@site/static/img/icon/redis.png";
import vercel from "@site/static/img/icon/vercel.png";
import microsoft_azure from "@site/static/img/icon/microsoft_azure.png";

import git from "@site/static/img/icon/git.png";
import github from "@site/static/img/icon/github.png";
import yaml from "@site/static/img/icon/yaml.png";
import powershell from "@site/static/img/icon/powershell.png";
import visual_studio from "@site/static/img/icon/visual_studio.png";
import rider from "@site/static/img/icon/rider.png";
import webstorm from "@site/static/img/icon/webstorm.png";

import figma from "@site/static/img/icon/figma.png";
import { allMenuData } from "./constants";
export interface GridItemType {
  readonly title: string;
  readonly link: string;
  readonly src: any;
  readonly hide: boolean;
}

function gridItem(
  title: string,
  link: string,
  src: any,
  hide:boolean = false
): GridItemType {
  return {
    title: title,
    link: link,
    src: src,
    hide:!!hide
  };
}

const allGridList: Array<GridItemType> = [
  gridItem(allMenuData.microsoft_sqlserver,"/",microsoft_sqlserver,true),
  gridItem(allMenuData.markdown, "/", markdown,true),
  gridItem(allMenuData.html, "/", html,true),
  gridItem(allMenuData.css, "/", css,true),
  gridItem(allMenuData.javascript, "/", javascript,true),
  gridItem(allMenuData.typescript, "/", typescript,true),
  gridItem(allMenuData.react, "/", react,true),
  gridItem(allMenuData.docusaurus, "https://docusaurus.io", docusaurus),
  gridItem(allMenuData.tailwind, "/", tailwindcss,true),
  gridItem(allMenuData.sass, "/", sass,true),
  gridItem(allMenuData.wexinMiniprogram,"/",wexin_mini_program,true),
  gridItem(allMenuData.npm, "/", npm,true),
  gridItem(allMenuData.yarn, "/", yarn,true),
  gridItem(allMenuData.vite, "/", vite,true),
  gridItem(allMenuData.graphql, "/", graphql,true),
  gridItem(allMenuData.csharp, "/", csharp,true),
  gridItem(allMenuData.go, "/", go,true),
  gridItem(allMenuData.nodejs, "/", nodejs,true),
  gridItem(allMenuData.postgresql, "/", postgresql,true),
  gridItem(allMenuData.mongodb, "/", mongodb,true),
  gridItem(allMenuData.cosmosdb, "/", cosmosdb,true),
  gridItem(allMenuData.redis, "/", redis,true),
  gridItem(allMenuData.vercel, "https://vercel.com/", vercel),
  gridItem(allMenuData.azure, "/", microsoft_azure,true),
  gridItem(allMenuData.git, "/", git,true),
  gridItem(allMenuData.github, "/", github,true),
  gridItem(allMenuData.yaml, "/", yaml,true),
  gridItem(allMenuData.powershell, "/", powershell,true),
  gridItem(allMenuData.visual_studio, "/", visual_studio,true),
  gridItem(allMenuData.rider, "/", rider,true),
  gridItem(allMenuData.webstorm, "/", webstorm,true),
  gridItem(allMenuData.figma, "/", figma,true),
];

export { allGridList };
