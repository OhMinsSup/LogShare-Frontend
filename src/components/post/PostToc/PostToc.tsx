import * as React from 'react';
import * as classNames from 'classnames/bind';
import { getScrollTop } from 'src/lib/common';
import { TocState } from 'src/store/modules/post';

const styles = require('./PostToc.scss');
const cx = classNames.bind(styles);

type Props = {
  toc: TocState[] | null;
  activeHeading: string | null;
  onActivateHeading(headingId: string): void;
};

type State = {
  fixed: boolean;
};

class PostToc extends React.Component<Props, State> {
  public element?: HTMLElement;
  public pos: number = 0;

  public state = {
    fixed: false,
  };

  public setPos = () => {
    const scrollTop = getScrollTop();
    if (!this.element) return;
    this.pos = scrollTop + this.element.getBoundingClientRect().top;
  };

  public setFixed = (fixed: boolean) => {
    if (this.state.fixed === fixed) return;
    this.setState({
      fixed,
    });
  };

  public componentDidMount() {
    this.registerEvent();
    if (!this.props.toc) return;
    this.setPos();
  }

  public componentWillUnmount() {
    this.unregisterEvent();
  }

  public onScroll = () => {
    const scrollTop = getScrollTop();
    this.setFixed(scrollTop > this.pos);
  };

  public registerEvent = () => {
    window.addEventListener('scroll', this.onScroll);
  };

  public unregisterEvent = () => {
    window.removeEventListener('scroll', this.onScroll);
  };

  public componentDidUpdate(prevProps: Props) {
    if (!prevProps.toc && this.props.toc) {
      this.setPos();
    }
  }

  public render() {
    const { toc, activeHeading } = this.props;
    const { fixed } = this.state;
    if (!toc) return null;
    return (
      <div
        className={cx('post-toc')}
        ref={ref => {
          if (!ref) return;
          this.element = ref;
        }}
      >
        <div className={cx('wrapper', { fixed })}>
          <ul>
            {toc.map(({ anchor, level, text }) => (
              <li
                style={{
                  paddingLeft: `${(level === 1 ? 0 : level - 2) * 0.5}rem`,
                }}
                className={cx({
                  active: activeHeading === anchor,
                })}
                key={anchor}
              >
                <a
                  onClick={() => this.props.onActivateHeading(anchor)}
                  href={`#${anchor}`}
                >
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default PostToc;
