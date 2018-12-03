import * as React from 'react';
import CommonTemplate from 'src/components/common/CommonTemplate';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import { match } from 'react-router';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import PrimarySidebarContainer from 'src/containers/base/PrimarySidebarContainer';
import SearchNavContainer from 'src/containers/search/SearchNavContainer';
import SearchDataList from 'src/containers/list/SearchDataList';
import { History } from 'history';

const Search: React.StatelessComponent<{
  match: match<{ tag: string; id: string; username: string }>;
  history: History;
}> = ({ match, history }) => (
  <CommonTemplate
    mainHead={<HeaderContainer match={match} />}
    mainSidebar={<SidebarContainer match={match} history={history} />}
    primarySidebar={<PrimarySidebarContainer />}
  >
    <SearchNavContainer />
    <SearchDataList />
  </CommonTemplate>
);

export default Search;
