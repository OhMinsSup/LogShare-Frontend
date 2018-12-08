import * as React from 'react';
import * as className from 'classnames/bind';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { Link } from 'react-router-dom';

const styles = require('./VideoBanner.scss');
const cx = className.bind(styles);

const Banner: React.StatelessComponent<{
  title: string;
  descrition: string;
  views: number;
  date: string;
  styles?: any;
}> = ({ title, descrition, views, date, styles }) => (
  <div className={cx('slick-slide')} style={styles}>
    <div className={cx('wrapper')}>
      <div className={cx('container')}>
        <Link to="/" className={cx('image-wrapper')}>
          <img
            src="https://udemy-images.udemy.com/course/480x270/964856_e3af_2.jpg"
            className={cx('image')}
          />
        </Link>
        <div className={cx('content')}>
          <div className={cx('label')}>추천 영상</div>
          <h3 className={cx('title')}>
            <Link to="/">{title}</Link>
          </h3>
          <div className={cx('info')}>
            <span>조회수 {views}회</span>
            <span style={{ margin: '0 4px' }}>•</span>
            <span>{date}</span>
          </div>
          <p className={cx('descrition')}>{descrition}</p>
          <Link to="/" className={cx('btn')}>
            동영상 보기
          </Link>
        </div>
      </div>
    </div>
  </div>
);

type Props = {
  videos: any[];
};

type State = {
  currentNumber: number;
};

class VideoBanner extends React.Component<Props, State> {
  public state: State = {
    currentNumber: 0,
  };

  public onNext = () => {
    if (this.state.currentNumber === this.props.videos.length - 1) {
      return this.setState({
        currentNumber: 0,
      });
    }

    this.setState({
      currentNumber: this.state.currentNumber += 1,
    });
  };

  public onPrev = () => {
    if (this.state.currentNumber <= 0) {
      return this.setState({
        currentNumber: this.props.videos.length - 1,
      });
    }

    this.setState({
      currentNumber: this.state.currentNumber -= 1,
    });
  };

  public render() {
    const { onNext, onPrev } = this;
    const { videos } = this.props;

    return (
      <div className={cx('video-banner')}>
        <button className={cx('arrow-prev')} onClick={onPrev}>
          <MdArrowBack />
        </button>
        <div className={cx('slick-list')}>
          {videos.map((video, index) => {
            return this.state.currentNumber === index ? (
              <Banner
                key={index}
                title={video.title}
                views={video.views}
                date={video.date}
                descrition={video.descrition}
              />
            ) : (
              <Banner
                key={index}
                title={video.title}
                views={video.views}
                date={video.date}
                descrition={video.descrition}
                styles={{ display: 'none' }}
              />
            );
          })}
        </div>
        <button className={cx('arrow-next')} onClick={onNext}>
          <MdArrowForward />
        </button>
        <div className={cx('location-wrapper')}>
          {videos.map((video, index) => {
            return this.state.currentNumber === index ? (
              <div
                key={index}
                className={cx('location')}
                style={{ backgroundColor: '#3897f0' }}
              />
            ) : (
              <div
                key={index}
                className={cx('location')}
                style={{ backgroundColor: '#dbdbdb' }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default VideoBanner;
