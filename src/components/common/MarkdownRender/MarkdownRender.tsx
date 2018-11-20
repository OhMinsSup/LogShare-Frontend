import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as marked from 'marked';
import { throttle } from 'lodash';
import 'prismjs/themes/prism-okaidia.css';
import { TocState } from 'src/store/modules/post';
import { escapeForUrl } from 'src/lib/common';

let Prism: any = null;
const isBrowser = process.env.APP_ENV === 'browser';

if (isBrowser) {
  Prism = require('prismjs');
  require('prismjs/components/prism-bash.min.js');
  require('prismjs/components/prism-javascript.min.js');
  require('prismjs/components/prism-jsx.min.js');
  require('prismjs/components/prism-css.min.js');
}

const styles = require('./MarkdownRender.scss');
const cx = classNames.bind(styles);

type Props = {
  markdown: string;
  onSetPostToc?(toc: TocState[] | null): void;
  OnSetActiveHeading?(headingId: string): void;
};

type State = {
  html?: string;
};

let toc: TocState[] = [];

function stripHtml(text: string): string {
  const regex = /<\/?[^>]+(>|$)/g;
  return text.replace(regex, '');
}

const createRenderer = (arr: any[]): any => {
  const renderer = new marked.Renderer();
  const linkRenderer = renderer.link;
  renderer.link = (href, title, text) => {
    const html = linkRenderer.call(renderer, href, title, text);
    return html.replace(/^<a /, '<a target="_blank" ');
  };
  renderer.heading = function heading(text, level, raw) {
    if (!raw) return '';
    const anchor =
      (this as any).options.headerPrefix + escapeForUrl(raw.toLowerCase());
    const hasDuplicate = arr.find(item => item.anchor === anchor);
    const filtered = arr.filter(item => item.anchor.indexOf(anchor) > -1);
    const suffix =
      !hasDuplicate && filtered.length === 0 ? '' : `-${filtered.length + 1}`;

    const suffixed = `${anchor}${suffix}`;
    if (level <= 3 && arr) {
      try {
        arr.push({
          anchor: suffixed,
          level,
          text: stripHtml(text),
        });
      } catch (e) {
        console.log(e);
      }
    }
    return `<h${level} id="${suffixed}">${text}</h${level}>`;
  };
};

class MarkdownRender extends React.Component<Props, State> {
  public positions: Array<{ id: string; top: number }> = [];
  public currentHeading?: string;

  public state = {
    html: '',
  };

  public onScroll = throttle((): any => {
    if (!document.body) return 0;
    const scrollTop = document.documentElement
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
    if (!document.body) return;
    if (!this.positions || this.positions.length === 0) return;
    for (let i = this.positions.length - 1; i > -1; i -= 1) {
      const pos = this.positions[i];
      if (pos.top < scrollTop + 32) {
        if (pos.id === this.currentHeading) return;
        this.currentHeading = pos.id;
        if (!this.props.OnSetActiveHeading) return;
        this.props.OnSetActiveHeading(pos.id);
        return;
      }
    }
    if (!this.props.OnSetActiveHeading) return;
    this.props.OnSetActiveHeading(this.positions[0].id);
  }, 33);

  public constructor(props: Props) {
    super(props);
    marked.setOptions({
      renderer: createRenderer(toc),
      gfm: true,
      tables: true,
      breaks: true,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
      xhtml: false,
      highlight(code, lang: string) {
        return Prism.highlight(
          code,
          Prism.languages[lang] || Prism.languages.markup,
          lang
        );
      },
    });
  }

  public registerEvent = () => {
    if (!this.props.onSetPostToc) return;
    window.addEventListener('scroll', this.onScroll);
  };

  public unregisterEvent = () => {
    window.removeEventListener('scroll', this.onScroll);
  };

  public updatePositions = (): any => {
    if (!toc) return;
    if (!document.body) return 0;
    const scrollTop = document.documentElement
      ? document.documentElement.scrollTop
      : document.body.scrollTop;
    this.positions = toc.map(({ anchor }) => {
      const dom = document.getElementById(anchor);
      if (!dom) return { top: 0, id: '' };
      return { top: dom.getBoundingClientRect().top + scrollTop, id: anchor };
    });
  };

  public renderMarkdown = () => {
    const { markdown } = this.props;
    if (toc) {
      toc = [];
    }

    if (!markdown) {
      this.setState({ html: '' });
      return;
    }

    if (this.props.onSetPostToc) {
      this.props.onSetPostToc(toc);
    }

    this.setState({
      html: marked(markdown, {
        breaks: true,
        sanitize: true,
      }),
    });
  };

  public componentWillUnmount() {
    this.unregisterEvent();
  }

  public componentWillMount() {
    this.renderMarkdown();
  }

  public componentDidMount() {
    Prism.highlightAll();
    this.registerEvent();
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.markdown !== this.props.markdown) {
      this.renderMarkdown();
    }

    if (prevState.html !== this.state.html) {
      Prism.highlightAll();
      this.updatePositions();
    }
  }

  public render() {
    const { html } = this.state;

    const markup = {
      __html: html,
    };

    return (
      <div className={cx('markdown-render')} dangerouslySetInnerHTML={markup} />
    );
  }
}

export default MarkdownRender;
