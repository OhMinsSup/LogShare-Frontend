import * as React from 'react';
import * as classNames from 'classnames/bind';
import { createArray } from 'src/lib/common';

const styles = require('./FakePostCards.scss');
const cx = classNames.bind(styles);

class GrayBox extends React.Component<{
  min: number;
  max: number;
}> {
  public static derfaultProps = {
    min: 1,
    max: 6,
  };

  public size = 1;

  constructor(props: { min: number; max: number }) {
    super(props);
    const { min, max } = this.props;
    this.size = min + Math.random() * (max - min);
  }

  public render() {
    return (
      <div className={cx('gray-box')} style={{ width: `${this.size}rem` }} />
    );
  }
}

const GrayBoxes: React.StatelessComponent<{
  count: number;
  min: number;
  max: number;
}> = ({ count, min, max }) => {
  const array = Array.from(Array(count).keys());
  return (
    <React.Fragment>
      {array.map(num => (
        <GrayBox key={num} min={min} max={max} />
      ))}
    </React.Fragment>
  );
};

const FakePostCard: React.StatelessComponent<{
  oneColumn: boolean;
}> = ({ oneColumn }) => (
  <div
    className={cx('post-card', 'fake-post-card', { 'one-column': oneColumn })}
  >
    <div className={cx('thumbnail-wrapper')}>
      <img className={cx('thumbnail')} />
    </div>
    <div className={cx('card-content')}>
      {!oneColumn && (
        <div className={cx('user-thumbnail-wrapper')}>
          <img />
        </div>
      )}
      <div className={cx('content-head')}>
        <div className={cx('username')}>
          <GrayBox min={6} max={8} />
        </div>
        <h3>
          <GrayBoxes count={7} max={6} min={1} />
        </h3>
        <div className={cx('subinfo')}>
          <GrayBox min={4} max={4} />
          <GrayBox min={5} max={5} />
        </div>
      </div>
      <div className={cx('description')}>
        <GrayBoxes count={15} max={6} min={1} />
      </div>
    </div>
  </div>
);

const FakePostCards: React.StatelessComponent<{
  posts: any[];
  oneColumn: boolean;
}> = ({ posts, oneColumn }) => (
  <React.Fragment>
    {createArray(posts.length === 0 ? 10 : posts.length).map(num => (
      <FakePostCard key={num} oneColumn={oneColumn} />
    ))}
  </React.Fragment>
);

export default FakePostCards;
