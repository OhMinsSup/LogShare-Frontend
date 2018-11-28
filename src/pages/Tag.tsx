import * as React from 'react';
import TagTemplate from 'src/components/tag/TagTemplate';
import HeaderContainer from 'src/containers/base/HeaderContainer';
import SidebarContainer from 'src/containers/base/SidebarContainer';
import PrimarySidebarContainer from 'src/containers/base/PrimarySidebarContainer';
import { match } from 'react-router';
import TagsPostCards from 'src/containers/list/TagsPostCards';

const Tag: React.StatelessComponent<{
  match: match<{ tag: string; id: string }>;
}> = ({ match }) => (
  <TagTemplate
    mainHead={<HeaderContainer match={match} />}
    mainSidebar={<SidebarContainer url={match.url} />}
    primarySidebar={<PrimarySidebarContainer />}
  >
    <TagsPostCards tag={match.params.tag} />
  </TagTemplate>
);

export default Tag;
