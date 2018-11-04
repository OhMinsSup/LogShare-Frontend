import * as React from 'react';
import LandingTemplate from 'src/components/landing/LandingTemplate';
import AuthFormContainer from './AuthFormContainer';

type Props = {};

class LandingTemplateContainer extends React.Component<Props> {
  public render() {
    return <LandingTemplate form={<AuthFormContainer />} />;
  }
}

export default LandingTemplateContainer;
