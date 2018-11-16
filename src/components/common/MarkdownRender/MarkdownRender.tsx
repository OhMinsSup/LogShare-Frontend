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
}

const styles = require('./MarkdownRender.scss');
const cx = classNames.bind(styles);

type Props = {
  markdown?: string;
};

type State = {
  html?: string;
};

class MarkdownRender extends React.Component<Props, State> {
  public state = {
    html: '',
  };

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
