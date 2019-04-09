export type GenericResponseAction<D, M> = {
  type: string;
  payload: D;
  meta: M;
};

export interface ICustomWindow extends Window {
  progress?: number;
}

(window as ICustomWindow).progress = 0;

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
