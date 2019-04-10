import * as React from 'react';
import * as classNames from 'classnames/bind';
import PostCard from '../../common/PostCard';

const styles = require('./SearchResults.scss');
const cx = classNames.bind(styles);

interface Props {
  results: {
    count: number;
    data: any[];
  } | null;
  onSearchNext: () => void;
}
const SearchResults: React.SFC<Props> = ({ results, onSearchNext }) => {
  const renderList = () => {
    if (!results) return null;
    return results.data.map((result, index) => (
      <PostCard
        title={result.title}
        postId={result.postId}
        createdAt={result.createdAt}
        post_thumbnail={result.post_thumbnail}
        body={result.body}
        info={result.info}
        tag={result.tag}
        user={result.user}
        key={index}
      />
    ));
  };
  if (!results) return null;
  return (
    <div className={cx('SearchResults')}>
      <div className={cx('count')}>
        총 <b>{results.count} 개</b>의 포스트를 찾았습니다.
      </div>
      {renderList()}
      {results.count > results.data.length && (
        <button className={cx('more-btn')} onClick={onSearchNext}>
          {results.count - results.data.length}개의 검색결과 더보기
        </button>
      )}
    </div>
  );
};

export default SearchResults;
