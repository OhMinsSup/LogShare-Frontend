import * as React from 'react';
import { throttle } from 'lodash';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { Dispatch, bindActionCreators } from 'redux';
import storage from 'src/lib/storage';
import { userCreators } from 'src/store/modules/user';
import { baseCreators } from 'src/store/modules/base';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class Core extends React.Component<Props> {
  public onResize = throttle(() => {
    this.setWidth();
  }, 250);

  constructor(props: Props) {
    super(props);
    this.setWidth();
  }

  public checkUser = () => {
    const authResult = storage.get('__log_share__');
    const { UserActions } = this.props;

    if (!authResult) {
      UserActions.process(null);
      return;
    }

    UserActions.process({ authResult });
  };

  public setWidth = () => {
    const { BaseActions } = this.props;
    if (typeof window === 'undefined') return;
    BaseActions.setWidth(window.outerWidth);
  };

  public initialize = () => {
    this.checkUser();
    window.addEventListener('resize', this.onResize);
  };

  public componentDidMount() {
    this.initialize();
  }

  public render() {
    return null;
  }
}

const mapStateToProps = ({ error }: StoreState) => ({
  code: error.code,
  error: error.error,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  BaseActions: bindActionCreators(baseCreators, dispatch),
  UserActions: bindActionCreators(userCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(Core);
