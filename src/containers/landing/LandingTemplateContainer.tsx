import * as React from 'react';
import LandingTemplate from 'src/components/landing/LandingTemplate';
import HeaderContainer from '../base/HeaderContainer';
import SidebarContainer from '../base/SidebarContainer';
import PrimarySidebarContainer from '../base/PrimarySidebarContainer';
import { match } from 'react-router';

type OwnProps = {
  match: match<string>;
};
type Props = OwnProps;

class LandingTemplateContainer extends React.Component<Props> {
  public render() {
    const {
      match: { url },
    } = this.props;
    return (
      <LandingTemplate
        mainHead={<HeaderContainer />}
        mainSidebar={<SidebarContainer url={url} />}
        primarySidebar={<PrimarySidebarContainer />}
      >
        칠드런
      </LandingTemplate>
    );
  }
}

export default LandingTemplateContainer;
