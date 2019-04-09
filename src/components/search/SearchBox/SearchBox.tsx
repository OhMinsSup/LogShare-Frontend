import * as React from 'react';
import * as classNames from 'classnames/bind';
import * as queryString from 'query-string';

import { IoIosSearch } from 'react-icons/io';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { debounce } from 'lodash';

const styles = require('./SearchBox.scss');
const cx = classNames.bind(styles);

interface State {
  value: string;
}
interface Props extends RouteComponentProps {
  onSearch: (keyword: string) => null | undefined;
}

class SearchBar extends React.Component<Props, State> {
  public input = React.createRef<HTMLInputElement>();
  public state = {
    value: '',
  };

  constructor(props: Props) {
    super(props);
    const { q } = queryString.parse(this.props.location.search);
    if (q) {
      this.state.value = q.toString();
    }
  }

  public componentDidMount() {
    const { value } = this.state;
    if (value) {
      this.onSearch();
    }
  }

  public onSearch = () => {
    const { value } = this.state;
    this.props.onSearch(value);
  };

  // tslint:disable-next-line: member-ordering
  public debouncedSearch = debounce(this.onSearch, 500);

  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        value: e.target.value,
      },
      () => {
        this.debouncedSearch();
      }
    );
  };

  public onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      this.onSearch();
      const input = this.input.current;
      if (!input) return;
      input.blur();
    }
  };

  public render() {
    const { value } = this.state;
    return (
      <div className={cx('search-box')}>
        <IoIosSearch />
        <input
          placeholder="찾고싶은 검색어를 입력하세요."
          value={value}
          onChange={this.onChange}
          onKeyPress={this.onKeyPress}
          autoFocus
          type="search"
          ref={this.input}
        />
      </div>
    );
  }
}

export default withRouter(SearchBar);
