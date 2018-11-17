import * as React from 'react';
import LoginForm from 'src/components/auth/LoginForm';
import { Dispatch, bindActionCreators } from 'redux';
import { authCreators } from 'src/store/modules/auth';
import { StoreState } from 'src/store/modules';
import { connect } from 'react-redux';
import { isEmail, isLength } from 'validator';
import * as queryString from 'query-string';
import { Location } from 'history';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type OwnProps = { location: Location };
type Props = StateProps & DispatchProps & OwnProps;

class LoginFormContainer extends React.Component<Props> {
  public onValidate = {
    email: (value: string) => {
      if (!isEmail(value)) {
        this.setError('잘못된 이메일 형식 입니다.');
        return false;
      }
      this.setError(null);
      return true;
    },
    password: (value: string) => {
      if (!isLength(value, { min: 6 })) {
        this.setError('비밀번호를 6자 이상 입력하세요.');
        return false;
      }
      this.setError(null);
      return true;
    },
  };

  public setError = (message: string | null) => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: 'login_form',
      name: 'error',
      message,
    });
  };

  public onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { AuthActions } = this.props;
    const { value, name } = e.target;

    AuthActions.changeInput({
      form: 'login_form',
      name,
      value,
    });

    const validation = this.onValidate[name](value);
    if (name.indexOf('password') > -1 || !validation) return;
  };

  public onLogin = () => {
    const {
      loginForm: { email, password },
      AuthActions,
    } = this.props;
    AuthActions.localLogin({
      email,
      password,
    });
  };

  public onSocialLogin = (provider: string) => {
    const nextUrl = this.props.nextUrl || '/recent';

    if (provider === 'google') {
      const goolgeLoginUrl = `http://localhost:4000/auth/callback/google/login?next=${nextUrl}`;
      window.location.replace(goolgeLoginUrl);
      return;
    }

    if (provider === 'facebook') {
      const facebookLoginUrl = `http://localhost:4000/auth/callback/facebook/login?next=${nextUrl}`;
      window.location.replace(facebookLoginUrl);
      return;
    }
  };

  public initialize = () => {
    const { AuthActions } = this.props;
    AuthActions.initial();
  };

  public componentDidMount() {
    const {
      location: { search },
    } = this.props;
    const query = queryString.parse(search);

    if (query.expired !== undefined) {
      this.setError('잘못된 계정정보입니다. 다시 로그인하세요');
      return;
    }

    this.initialize();
  }

  public render() {
    const {
      loginForm: { email, password, error },
    } = this.props;
    const { onChange, onLogin, onSocialLogin } = this;

    return (
      <LoginForm
        email={email}
        password={password}
        onChange={onChange}
        error={error}
        onLogin={onLogin}
        onSocialLogin={onSocialLogin}
      />
    );
  }
}

const mapStateToProps = ({ auth }: StoreState) => ({
  loginForm: auth.login_form,
  nextUrl: auth.nextUrl,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  AuthActions: bindActionCreators(authCreators, dispatch),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(LoginFormContainer);
