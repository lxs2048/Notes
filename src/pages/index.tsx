import React, { useState } from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import BrowserOnly from "@docusaurus/BrowserOnly";
import { isMobile, setClipBoardText } from "@site/src/utils";
import PageProgressBar from "@site/src/components/PageProgressBar";
import {
  type PortfolioType,
  type TagType,
  portfolioListData,
  allGridList,
  contactList,
  allMenuData
} from "@site/src/data";
import Notification from "@site/src/components/Notification";
import GridList from "@site/src/components/GridList";
import siteLogo from '@site/static/img/logo/logosc62eccf4c.png'
import styles from './index.module.css';
type HomepageHeaderProps = {
  isMobileDevice: boolean;
};
type ContactMeBtnProps = {
  readonly title?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly src: any;
  link?: string;
  isCopyBtn?: boolean;
  copySuccess?: () => void;
};

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <BrowserOnly fallback={undefined}>
      {() => {
        const isMobileDevice: boolean = isMobile();
        return <Layout
          title={`${siteConfig.title}`}
          description="前端文档"
        >
          <HomepageHeader isMobileDevice={isMobileDevice} />
          <main>
            <div className={styles.mainContainer}>
              <div className={styles.listTitle}>
                {allMenuData.links}
              </div>
              <GridList data={allGridList} />
              <PortfolioArea isMobileDevice={isMobileDevice} />
            </div>
            <PageProgressBar />
          </main>
        </Layout>
      }}
    </BrowserOnly>
  );
}

function HomepageHeader({ isMobileDevice }: HomepageHeaderProps): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  const TO_WIKI_BUTTON_TEXT = "Go to Docs";
  const COPY_SUCCESS = "已复制到剪切板";
  const [show, setShow] = useState<boolean>(false);
  function copySuccess(): void {
    setShow(true);
    !show &&
      setTimeout(() => {
        setShow(false);
      }, 4000);
  }
  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={clsx(styles.heroTextContainer)}>
        {!isMobileDevice && (
          <div className={styles.avatarArea}>
            <img src={siteLogo} alt="siteLogo" />
          </div>
        )}
        <div className={styles.heroTextArea}>
          <p className={styles.heroTextSubTitle}>{siteConfig.tagline}</p>
          <div className={styles.heroTextAreaButton}>
            <Link
              className={clsx(
                "button",
                "button--secondary",
                "button--md",
                styles.heroTextButton
              )}
              to="/blog"
            >
              {TO_WIKI_BUTTON_TEXT}
            </Link>
          </div>
          <div className={styles.navLinkIconArea}>
            {
              contactList.filter(i=>!i.hide).map(item=>{
                return  <ContactMeBtn
                  key={item.title}
                  title={item.title}
                  src={item.src}
                  link={item.link}
                  isCopyBtn={item.isCopyBtn}
                  copySuccess={item.isCopyBtn?copySuccess:undefined}
                />
              })
            }
          </div>
        </div>
        {!isMobileDevice && (
          <ArrowDownBtn />
        )}
        <Notification show={show} title={COPY_SUCCESS} changeShow={setShow} />
      </div>
    </header>
  );
}

function ArrowDownBtn(): JSX.Element {
  return (
    <span className={styles.arrowDownBtnWrapper}>
      <svg
        className={styles.arrowDownBtn}
        aria-hidden="true"
        viewBox="-75.52 -43.52 599.04 599.04"
        fill="currentColor"
        onClick={() => {
          window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }}
      >
        <path d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z" />
      </svg>
    </span>
  );
}

function PortfolioArea({ isMobileDevice }: HomepageHeaderProps): JSX.Element {
  const PORTFOLIO = "Portfolio";
  return (
    <div className={styles.portfolioArea}>
      <div className={styles.listTitle}>{PORTFOLIO}</div>
      <div className={styles.portfolioListWrapper}>
        {portfolioListData.map((item: PortfolioType) => {
          return (
            <Link
              className={styles.portfolioCardWrapper}
              key={item.name}
              to={item.siteLink}
            >
              <div className={styles.portfolioCardLeft}>
                <h4>{item.name}</h4>
                <div className={styles.description}>{item.description}</div>
                {!isMobileDevice && (
                  <div className={styles.tagWrapper}>
                    {item.stackTags?.map((tag: TagType) => {
                      return (
                        <div
                          key={tag.name}
                          className={styles.tag}
                          style={{ background: tag.bgColor }}
                        >
                          <img
                            src={tag.iconSrc}
                            loading="eager"
                            width="12"
                            height="12"
                          />
                          {tag.name}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div className={styles.portfolioCardRight}>
                <img src={item.src} loading="eager" width="40" height="40" />
                {!isMobileDevice && (
                  <div className={clsx(styles.status, styles.tag)}>
                    {item.status}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
function ContactMeBtn({
  title,
  src,
  link,
  isCopyBtn = false,
  copySuccess,
}: ContactMeBtnProps): JSX.Element {
  if (isCopyBtn && typeof link !== "undefined") {
    return (
      <div
        className={styles.navLink}
        onClick={() => {
          setClipBoardText(link);
          copySuccess && copySuccess();
        }}
      >
        <div className={styles.imageWrapper}>
          <img src={src} alt={title} title={title} />
        </div>
      </div>
    );
  }
  return (
    <Link className={styles.navLink} to={link} href="_blank">
      <div className={styles.imageWrapper}>
        <img src={src} alt={title} title={title} />
      </div>
    </Link>
  );
}