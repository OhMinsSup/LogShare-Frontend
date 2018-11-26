import { fork, put, call, takeEvery, select, all } from 'redux-saga/effects';
import {
  AuthActionType,
  TokenDataState,
  VerifySocialResultState,
  AuthResultState,
  ExistsState,
} from '../modules/auth';
import * as AuthAPI from '../../lib/api/auth';
import * as AuthType from './types/auth';
import { StoreState } from '../modules';
import { UserActionType } from '../modules/user';
import storage from 'src/lib/storage';
import { ErrorActionType } from '../modules/error';

function* checkExists(action: any) {
  const {
    payload: { key, value },
  }: AuthType.ChekcExistsPayload = action;

  try {
    const responseCheckExists: AuthType.ChekcExistsResponse = yield call(
      AuthAPI.checkExists,
      {
        key,
        value,
      }
    );

    yield put({
      type: AuthActionType.CHECK_EXISTS_SUCCESS,
      payload: {
        exists: responseCheckExists.data.exists,
        key,
      },
    });

    const existsSelect: ExistsState = yield select(
      ({ auth }: StoreState) => auth.exists
    );

    if (existsSelect.email) {
      yield put({
        type: AuthActionType.SET_ERROR,
        payload: {
          form: 'register_form',
          name: 'error',
          message: '이미 존재하는 이메일입니다.',
        },
      });
    } else if (existsSelect.username) {
      yield put({
        type: AuthActionType.SET_ERROR,
        payload: {
          form: 'register_form',
          name: 'error',
          message: '이미 존재하는 아이디입니다.',
        },
      });
    }
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* localRegister(action: any) {
  const {
    payload: { email, username, password },
  }: AuthType.LocalRegisterPayload = action;

  try {
    const responseLocalRegiter: AuthType.LocalRegisterResponse = yield call(
      AuthAPI.localRegister,
      {
        email,
        username,
        password,
      }
    );

    yield put({
      type: AuthActionType.LOCAL_REGISTER_SUCCESS,
      payload: {
        user: responseLocalRegiter.data.user,
      },
    });

    const authResultSelect: AuthResultState = yield select(
      (state: StoreState) => state.auth.authResult
    );

    if (!authResultSelect) {
      yield put({
        type: ErrorActionType.ERROR,
        payload: {
          error: true,
          code: 404,
        },
      });
      return;
    }

    yield put({
      type: UserActionType.SET_USER_REQUEST,
      payload: {
        authResult: authResultSelect,
      },
    });
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* localLogin(action: any) {
  const {
    payload: { email, password },
  }: AuthType.LocalLoginPayload = action;

  try {
    const responseLocalLogin: AuthType.LocalLoginResponse = yield call(
      AuthAPI.localLogin,
      {
        email,
        password,
      }
    );

    yield put({
      type: AuthActionType.LOCAL_LOGIN_SUCCESS,
      payload: {
        user: responseLocalLogin.data.user,
      },
    });

    const authResultSelect: AuthResultState = yield select(
      (state: StoreState) => state.auth.authResult
    );

    yield put({
      type: UserActionType.SET_USER_REQUEST,
      payload: {
        authResult: authResultSelect,
      },
    });
  } catch (e) {
    storage.remove('__log_share__');
    window.location.href = '/auth/login?expired';

    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* callbackSocial(action: any) {
  const {
    payload: { next, provider, history },
  }: AuthType.GetProviderTokenPayload = action;

  try {
    const responseToken: AuthType.GetProviderTokenResponse = yield call(
      AuthAPI.getProviderToken
    );

    yield put({
      type: AuthActionType.GET_PROVIDER_TOKEN_SUCCESS,
      payload: {
        provider: provider,
        token: responseToken.data.token,
      },
    });

    const tokenDataSelect: TokenDataState = yield select(
      (state: StoreState) => state.auth.tokenData
    );

    if (!tokenDataSelect.token) {
      yield put({
        type: ErrorActionType.ERROR,
        payload: {
          error: true,
          code: 404,
        },
      });
      return;
    }

    const responseVerify: AuthType.VerifySocialResponse = yield call(
      AuthAPI.verifySocial,
      {
        accessToken: tokenDataSelect.token,
        provider: tokenDataSelect.type,
      }
    );

    yield put({
      type: AuthActionType.VERIFY_SOCIAL_SUCCESS,
      payload: {
        profile: responseVerify.data.profile,
        exists: responseVerify.data.exists,
      },
    });

    const verifySocialResultSelect: VerifySocialResultState = yield select(
      (state: StoreState) => state.auth.verifySocialResult
    );

    if (!verifySocialResultSelect) {
      yield put({
        type: ErrorActionType.ERROR,
        payload: {
          error: true,
          code: 404,
        },
      });
      return;
    }

    if (verifySocialResultSelect.exists) {
      const responseSocialLogin: AuthType.SocialLoginResponse = yield call(
        AuthAPI.socialLogin,
        {
          accessToken: tokenDataSelect.token,
          provider: tokenDataSelect.type,
        }
      );

      yield put({
        type: AuthActionType.SOCIAL_LOGIN_SUCCESS,
        payload: {
          user: responseSocialLogin.data.user,
        },
      });

      const authResultSelect: AuthResultState = yield select(
        (state: StoreState) => state.auth.authResult
      );

      if (!authResultSelect) {
        yield put({
          type: ErrorActionType.ERROR,
          payload: {
            error: true,
            code: 404,
          },
        });
        return;
      }

      yield put({
        type: UserActionType.SET_USER_REQUEST,
        payload: {
          authResult: authResultSelect,
        },
      });

      history.push(next || '/recent');
      return;
    }

    const { email, username } = verifySocialResultSelect;

    yield put({
      type: AuthActionType.AUTOCOMPLETE_REGISTER_FORM,
      payload: {
        email,
        username,
      },
    });

    history.push('/auth/register');
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* socialRegister(action: any) {
  const {
    payload: { accessToken, username, provider, history },
  }: AuthType.SocialRegisterPayload = action;

  try {
    const response: AuthType.SocialRegisterResponse = yield call(
      AuthAPI.socialRegister,
      {
        accessToken,
        username,
        provider,
      }
    );

    yield put({
      type: AuthActionType.SOCIAL_REGISTER_SUCCESS,
      payload: {
        user: response.data.user,
      },
    });

    const authResultSelect: AuthResultState = yield select(
      (state: StoreState) => state.auth.authResult
    );

    if (!authResultSelect) {
      yield put({
        type: ErrorActionType.ERROR,
        payload: {
          error: true,
          code: 404,
        },
      });
      return;
    }

    yield put({
      type: UserActionType.SET_USER_REQUEST,
      payload: {
        authResult: authResultSelect,
      },
    });

    history.push('/recent');
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* watchCheckExists() {
  yield takeEvery(AuthActionType.CHECK_EXISTS_REQUEST, checkExists);
}

function* watchLocalRegister() {
  yield takeEvery(AuthActionType.LOCAL_REGISTER_REQUEST, localRegister);
}

function* watchLocalLogin() {
  yield takeEvery(AuthActionType.LOCAL_LOGIN_REQUEST, localLogin);
}

function* watchCallBackSocial() {
  yield takeEvery(AuthActionType.GET_PROVIDER_TOKEN_REQUEST, callbackSocial);
}

function* watchSocialRegister() {
  yield takeEvery(AuthActionType.SOCIAL_REGISTER_REQUEST, socialRegister);
}

export default function* authSaga() {
  yield all([
    fork(watchCheckExists),
    fork(watchLocalRegister),
    fork(watchLocalLogin),
    fork(watchCallBackSocial),
    fork(watchSocialRegister),
  ]);
}
