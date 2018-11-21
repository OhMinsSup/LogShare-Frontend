import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as marked from 'marked';
import 'prismjs/themes/prism-okaidia.css';

let Prism: any = null;
const isBrowser = process.env.APP_ENV === 'browser';

if (isBrowser) {
  Prism = require('prismjs');
  require('prismjs/components/prism-bash.min.js');
  require('prismjs/components/prism-javascript.min.js');
  require('prismjs/components/prism-jsx.min.js');
  require('prismjs/components/prism-css.min.js');
  require('prismjs/components/prism-scss.min');
  require('prismjs/components/prism-typescript.min');
  require('prismjs/components/prism-python.min');
  require('prismjs/components/prism-go.min');
}

const styles = require('./MarkdownRender.scss');
const cx = classNames.bind(styles);

type Props = {
  markdown: string;
};

type State = {
  html: string;
};

class MarkdownRender extends React.Component<Props, State> {
  public positions: Array<{ id: string; top: number }> = [];
  public currentHeading?: string;

  public state = {
    html: '',
  };

  public constructor(props: Props) {
    super(props);
    marked.setOptions({
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

  public renderMarkdown = () => {
    const { markdown } = this.props;

    if (!markdown) {
      this.setState({ html: '' });
      return;
    }

    this.setState({
      html: marked(markdown, {
        breaks: true,
        sanitize: true,
      }),
    });
  };

  public componentWillMount() {
    this.renderMarkdown();
  }

  public componentDidMount() {
    Prism.highlightAll();
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.markdown !== this.props.markdown) {
      this.renderMarkdown();
    }

    if (prevState.html !== this.state.html) {
      Prism.highlightAll();
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
