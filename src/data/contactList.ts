/* eslint-disable @typescript-eslint/no-explicit-any */
import github from "@site/static/img/icon/github.png";
import gmail from "@site/static/img/icon/gmail.png";
import wechat from "@site/static/img/icon/wexin_mini_program.png";

import { contactMeData } from "./constants";
export interface contactItemType {
  readonly title: string;
  readonly link: string;
  readonly src: any;
  readonly isCopyBtn: boolean;//复制类型
  readonly hide: boolean;//隐藏
}

function contactItem(
  title: string,
  link: string,
  src: any,
  isCopyBtn:boolean,
  hide:boolean = false
): contactItemType {
  return {
    title: title,
    link: link,
    src: src,
    isCopyBtn:isCopyBtn,
    hide:!!hide
  };
}

const contactList: Array<contactItemType> = [
  contactItem(contactMeData.github,contactMeData.githubLink,github,false),
  contactItem(contactMeData.email,contactMeData.emailAddress, gmail,true),
  contactItem(contactMeData.wechat, contactMeData.wechatAccount, wechat,true),
];

export { contactList };
