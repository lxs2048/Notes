# vite脚手架与vite的区别

vite官网搭建vite项目: https://vitejs.dev/guide/#scaffolding-your-first-vite-project

我们使用`yarn create vite`命令

1. 帮我们全局安装一个东西: create-vite (vite的脚手架)
2. 直接运行这个create-vite在bin目录的下的一个执行配置

有人可能会存在这样的误区: **认为官网中使用对应yarn create构建项目的过程也是vite在做的事情**

使用vue-cli会内置webpack，vue-cli可以和webpack分的很清楚

create-vite和vite的关系是什么呢？

create-vite内置了vite，只不过vite和create-vite都是vue团队的

**vue团队希望弱化vite的一个存在感, 但是我们去学习的时候不能弱化的**

我们自己搭建一个项目: 下载vite, vue, post-css, less, babel

create-vite给你一套预设: 下载vite, vue, post-css, less, babel好了, 并且做好了最佳实践的配置