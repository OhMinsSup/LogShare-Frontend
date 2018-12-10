export type GenericResponseAction<D, M> = {
  type: string;
  payload: D;
  meta: M;
};

export const getScrollTop = () => {
  if (!document.body) return 0;
  const scrollTop = document.documentElement
    ? document.documentElement.scrollTop || document.body.scrollTop
    : document.body.scrollTop;
  return scrollTop;
};

export const getScrollBottom = () => {
  if (!document.body) return 0;
  const { scrollHeight } = document.body;
  const { innerHeight } = window;
  const scrollTop = getScrollTop();
  return scrollHeight - innerHeight - scrollTop;
};

export const escapeForUrl = (text: string): string => {
  return text
    .replace(
      /[^0-9a-zA-Zㄱ-힣.\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf -]/g,
      ''
    )
    .replace(/ /g, '-')
    .replace(/--+/g, '-');
};

export const shareTwitter = (href: string, text: string) => {
  window.open(
    `https://twitter.com/share?url=${encodeURI(
      encodeURI(href)
    )}&text=${text}&hashtags=logshare`,
    'sharer',
    'toolbar=0,status=0,width=626,height=436'
  );
};

export const shareFacebook = (href: string) => {
  (window as any).FB.ui({
    method: 'share',
    mobile_iframe: true,
    href,
  });
};

export const createArray = (length: number) => Array.from(Array(length).keys());

export const defaultCoverBg =
  'https://cdn.hashnode.com/res/hashnode/image/hashnode-assets/misc/upload/w_700,h_240,c_thumb/v1520405545406/S1-4hZadG.jpeg';

  /*
  import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class App extends React.Component {
  Pause = () => {
    const video = document.getElementById("videos");
    video.pause();
  };
  Play = () => {
    const video = document.getElementById("videos");
    if (video.paused) {
      video.play();
    }
  };

  onClick = () => {
    window.location.href = "www.naver.com";
  };

  render() {
    const { Play, Pause, onClick } = this;
    return (
      <div onClick={onClick}>
        <video
          id="videos"
          width="400"
          controls
          musted
          onMouseOver={Play}
          onMouseOut={Pause}
        >
          <source
            src="https://res.cloudinary.com/planeshare/video/upload/v1544270562/LogShare/video-upload/%ED%97%AC%EB%A1%9C%EC%9A%B0%EB%B0%A9/360p_%EB%B0%95%ED%9A%A8%EC%8B%A0_2016_LIVE_I_AM_A_DREAMER_HOME.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

  */