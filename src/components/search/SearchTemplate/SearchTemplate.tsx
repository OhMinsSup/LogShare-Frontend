import * as React from 'react';
import * as classNames from 'classnames/bind';

const styles = require('./SearchTemplate.scss');
const cx = classNames.bind(styles);

interface SearchTemplateProps {
  searchBox: React.ReactNode;
}

const SearchTemplate: React.SFC<SearchTemplateProps> = ({
  searchBox,
  children,
}) => {
  return (
    <div className={cx('SearchTemplate')}>
      <div className={cx('search-box-area')}>{searchBox}</div>
      <div className={cx('contents')}>{children}</div>
    </div>
  );
};

export default SearchTemplate;
