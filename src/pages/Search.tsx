import * as React from 'react';
import CommonTemplate from 'src/components/common/CommonTemplate';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import { match } from 'react-router';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import PrimarySidebarContainer from 'src/containers/base/PrimarySidebarContainer';
import { History } from 'history';
import SearchTemplate from 'src/components/search/SearchTemplate';
import SearchBoxContainer from 'src/containers/search/SearchBoxContainer';
import SearchResultsContainer from 'src/containers/search/SearchResultsContainer';

const Search: React.StatelessComponent<{
  match: match<{ tag: string; id: string; username: string }>;
  history: History;
}> = ({ match, history }) => {
  return (
    <CommonTemplate
      mainHead={<HeaderContainer match={match} />}
      mainSidebar={<SidebarContainer match={match} history={history} />}
      primarySidebar={<PrimarySidebarContainer />}
    >
      <SearchTemplate searchBox={<SearchBoxContainer />}>
        <SearchResultsContainer />
      </SearchTemplate>
    </CommonTemplate>
  );
};

export default Search;
