import * as React from 'react';
import PageTemplate from 'src/components/base/PageTemplate';
import LandingTemplateContainer from 'src/containers/landing/LandingTemplateContainer';
import { match } from 'react-router';
import { Location } from 'history';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { authCreators } from 'src/store/modules/auth';
import { StoreState } from 'src/store/modules';
import * as queryString from 'query-string';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { match: match<{ id: string }>; location: Location };
type Props = OwnProps & StateProps & DispatchProps;

class Home extends React.Component<Props> {
  public constructor(props: Props) {
    super(props);

    const { AuthActions } = this.props;
    const query = queryString.parse(this.props.location.search);

    if (query.next) {
      AuthActions.setNextUrl(query.next);
    }
  }

  public render() {
    const { match } = this.props;
    return (
      <PageTemplate>
        <LandingTemplateContainer match={match} />
      </PageTemplate>
    );
  }
}

const mapStateToProps = (state: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  AuthActions: bindActionCreators(authCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Home);
