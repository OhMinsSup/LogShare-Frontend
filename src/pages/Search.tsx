import * as React from 'react';
import CommonTemplate from 'src/components/common/CommonTemplate';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import { match } from 'react-router';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import PrimarySidebarContainer from 'src/containers/base/PrimarySidebarContainer';
import SearchNavContainer from 'src/containers/search/SearchNavContainer';
import SearchDataList from 'src/containers/list/SearchDataList';

const Search: React.StatelessComponent<{
  match: match<{}>;
}> = ({ match }) => (
  <CommonTemplate
    mainHead={<HeaderContainer match={match} />}
    mainSidebar={<SidebarContainer url={match.url} />}
    primarySidebar={<PrimarySidebarContainer />}
  >
    <SearchNavContainer />
    <SearchDataList />
  </CommonTemplate>
);

export default Search;
