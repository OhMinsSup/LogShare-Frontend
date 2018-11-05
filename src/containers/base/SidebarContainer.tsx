import * as React from 'react';
import Sidebar from 'src/components/base/Sidebar/Sidebar';

type OwnProps = { url: string };
type Props = OwnProps;

class SidebarContainer extends React.Component<Props> {
  public render() {
    const { url } = this.props;

    return <Sidebar url={url} />;
  }
}

export default SidebarContainer;
