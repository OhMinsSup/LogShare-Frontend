import * as React from 'react';
import RegisterForm from 'src/components/auth/RegisterForm';
import { connect } from 'react-redux';
import { StoreState } from 'src/store/modules';
import { isEmail, isLength, isAlphanumeric } from 'validator';
import { Dispatch, bindActionCreators } from 'redux';
import { authCreators } from 'src/store/modules/auth';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

class RegisterFormContainer extends React.Component<Props> {
  public onValidate = {
    email: (value: string) => {
      if (!isEmail(value)) {
        this.setError('잘못된 이메일 형식 입니다.');
        return false;
      }
      this.setError(null);
      return true;
    },
    username: (value: string) => {
      if (!isAlphanumeric(value) || !isLength(value, { min: 4, max: 15 })) {
        this.setError(
          '아이디는 4~15 글자의 알파벳 혹은 숫자로 이뤄져야 합니다.'
        );
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
    passwordConfirm: (value: string) => {
      if (this.props.registerForm.password !== value) {
        this.setError('비밀번호확인이 일치하지 않습니다.');
        return false;
      }
      this.setError(null);
      return true;
    },
  };

  public onCheckExists = (key: string, value: string) => {
    const { AuthActions } = this.props;

    AuthActions.checkExists({ key, value });
  };

  public setError = (message: string | null) => {
    const { AuthActions } = this.props;
    AuthActions.setError({
      form: 'register_form',
      name: 'error',
      message,
    });
  };

  public onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { AuthActions } = this.props;
    const { value, name } = e.target;

    AuthActions.changeInput({
      form: 'register_form',
      name,
      value,
    });

    const validation = this.onValidate[name](value);
    if (name.indexOf('password') > -1 || !validation) return;

    const check = name === 'email' ? this.onCheckExists : this.onCheckExists;
    check(name, value);
  };

  public render() {
    const {
      registerForm: { username, email, password, passwordConfirm, error },
    } = this.props;
    const { onChange } = this;

    return (
      <RegisterForm
        username={username}
        email={email}
        password={password}
        passwordConfirm={passwordConfirm}
        onChange={onChange}
        error={error}
      />
    );
  }
}

const mapStateToProps = ({ auth }: StoreState) => ({
  registerForm: auth.register_form,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  AuthActions: bindActionCreators(authCreators, dispatch),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(RegisterFormContainer);
