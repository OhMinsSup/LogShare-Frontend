import * as React from 'react';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import PrimarySidebarContainer from 'src/containers/base/PrimarySidebarContainer';
import { match } from 'react-router';
import TagsPostCards from 'src/containers/list/TagsPostCards';
import CommonTemplate from 'src/components/common/CommonTemplate';

const Tag: React.StatelessComponent<{
  match: match<{ tag: string; id: string }>;
}> = ({ match }) => (
  <CommonTemplate
    mainHead={<HeaderContainer match={match} />}
    mainSidebar={<SidebarContainer url={match.url} />}
    primarySidebar={<PrimarySidebarContainer />}
  >
    <TagsPostCards tag={match.params.tag} />
  </CommonTemplate>
);

export default Tag;