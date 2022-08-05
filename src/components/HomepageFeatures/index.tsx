import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Des: JSX.Element;
  Img?:string
};

const FeatureList: FeatureItem[] = [
  {
    title: '人民有信仰',
    Img: require('@site/static/img/20220805153208.jpg').default,
    Des: (
      <>
        <p>可能南方的阳光照着北方的风</p>
        <p>可能时光被吹走从此无影无踪</p>
        <p>可能故事只剩下一个难忘的人</p>
        <p>可能在昨夜梦里依然笑得纯真</p>
        <p>可能北京的后海许多漂泊的魂</p>
        <p>可能成都小酒馆有群孤独的人</p>
        <p>可能枕边有微笑才能暖你清晨</p>
        <p>可能夜空有流星才能照你前行</p>
        <p>可能西安城墙上有人誓言不分</p>
      </>
    ),
  },
  {
    title: '国家有力量',
    Img: require('@site/static/img/20220805153208.jpg').default,
    Des: (
      <>
        <p>可能要去到大理才算爱得认真</p>
        <p>可能谁说要陪你牵手走完一生</p>
        <p>可能笑着流出泪某天在某时辰</p>
        <p>可能桂林有渔船为你迷茫点灯</p>
        <p>可能在呼伦草原牛羊流成风景</p>
        <p>可能再也找不到愿意相信的人</p>
        <p>可能穿越了彷徨脚步才能坚定</p>
        <p>可能武当山道上有人虔诚攀登</p>
        <p>可能周庄小巷里忽然忘掉年轮</p>
        <p>可能要多年以后才能看清曾经</p>
      </>
    ),
  },
  {
    title: '民族有希望',
    Img: require('@site/static/img/20220805153208.jpg').default,
    Des: (
      <>
        <p>可能在当时身边有双温柔眼晴</p>
        <p>可能西安城墙上有人誓言不分</p>
        <p>可能要去到大理才算爱得认真</p>
        <p>可能谁说要陪你牵手走完一生</p>
        <p>可能笑着流出泪</p>
        <p>可能终于有一天刚好遇见爱情</p>
        <p>可能永远在路上有人奋斗前行</p>
        <p>可能一切的可能相信才有可能</p>
        <p>可能拥有过梦想才能叫做青春</p>
      </>
    ),
  },
];

function Feature({title, Des,Img}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        { Img && <img src={Img} className={styles.cardImg} />}
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        {Des}
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
