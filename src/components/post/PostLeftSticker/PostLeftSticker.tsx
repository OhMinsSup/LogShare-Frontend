import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as Tooltip from 'react-tooltip';
import { FaHeart, FaRegHeart, FaFacebook, FaTwitter } from 'react-icons/fa';
import { MdShare, MdClass } from 'react-icons/md';
import { getScrollTop } from 'src/lib/common';

const styles = require('./PostLeftSticker.scss');
const cx = classNames.bind(styles);

type Props = {
  likes: number;
  liked: boolean;
  onToggleLike: () => void;
  logged: boolean;
  url?: string;
  title: string;
};

type State = {
  fixed: boolean;
  openShare: boolean;
  justLiked: boolean;
};

class PostLeftSticker extends React.Component<Props, State> {
  public pos: number = 0;
  public element: any = React.createRef();
  public state = {
    fixed: false,
    openShare: false,
    justLiked: false,
  };

  public componentDidMount() {
    if (!this.element.current) return;
    this.pos = this.element.current.getBoundingClientRect().top;
    window.addEventListener('scroll', this.onScroll);
  }

  public onScroll = () => {
    const scrollTop = getScrollTop();
    const fixed = scrollTop >= this.pos;
    if (this.state.fixed !== fixed) {
      this.setState({ fixed });
    }
  };

  public onToggleShareButton = () => {
    this.setState({
      openShare: !this.state.openShare,
    });
  };

  public onFacebookShare = () => {
    this.onToggleShareButton();
  };

  public onTwitterShare = () => {
    this.onToggleShareButton();
  };

  public componentDidUpdate(prevProps: Props) {
    if (!prevProps.liked && this.props.liked) {
      this.setState({
        justLiked: true,
      });
    }
  }
  public componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }
  public render() {
    const { likes, liked, logged, onToggleLike } = this.props;
    const { fixed, openShare, justLiked } = this.state;
    return (
      <div className={cx('post-left-sticker')} ref={this.element}>
        <div className={cx('wrapper', { fixed })}>
          <button
            onClick={onToggleLike}
            className={cx('circle', 'like', {
              disabled: !logged,
              liked,
              justLiked: liked && justLiked,
            })}
            {...(logged
              ? {}
              : {
                  'data-tip': '로그인 후 이용해주세요.',
                })}
          >
            {liked ? <FaHeart /> : <FaRegHeart />}
          </button>
          <div className={cx('likes-count')}>{likes}</div>
          <button
            className={cx('circle', 'share')}
            onClick={this.onToggleShareButton}
          >
            {openShare ? <MdClass /> : <MdShare />}
          </button>
          {openShare && (
            <React.Fragment>
              <button
                className={cx('circle', 'share')}
                onClick={this.onFacebookShare}
              >
                <FaFacebook />
              </button>
              <button
                className={cx('circle', 'share')}
                onClick={this.onTwitterShare}
              >
                <FaTwitter />
              </button>
            </React.Fragment>
          )}
        </div>
        <Tooltip effect="solid" className="tooltip" />
      </div>
    );
  }
}

export default PostLeftSticker;
