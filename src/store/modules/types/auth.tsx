import { History } from 'history';
import { GenericResponseAction } from 'src/lib/common';
import { authCreators } from '../auth';

export type LocalRegisterPayload = {
  email: string;
  username: string;
  password: string;
};
export type ChangeInputPayload = { form: string; name: string; value: string };
export type ErrorPayload = {
  form: string;
  name: string;
  message: string | null;
};
export type SocialRegisterPayload = {
  accessToken: string;
  provider: string;
  username: string;
  history: History;
};
export type CheckExistsPayload = { key: string; value: string };
export type LocalLoginPayload = { email: string; password: string };
export type AutoCompleteFormPayload = { email: string; username: string };
export type CallbackSocialPayload = {
  provider: string;
  next: string;
  history: History;
};

export type SocialRegisterAction = GenericResponseAction<
  {
    user: {
      _id: string;
      email: string;
      profile: {
        username: string;
        thumbnail: string;
        shortBio: string;
      };
    };
  },
  string
>;

export type CheckExistsAction = GenericResponseAction<
  { exists: boolean; key: string },
  string
>;
export type LocalRegisterAction = GenericResponseAction<
  {
    user: {
      _id: string;
      email: string;
      profile: {
        username: string;
        thumbnail: string;
        shortBio: string;
      };
    };
  },
  string
>;
export type LocalLoginAction = GenericResponseAction<
  {
    user: {
      _id: string;
      email: string;
      profile: {
        username: string;
        thumbnail: string;
        shortBio: string;
      };
    };
  },
  string
>;
export type GetProviderTokenAction = GenericResponseAction<
  {
    token: string;
    provider: string;
  },
  string
>;
export type VerifySocialAction = GenericResponseAction<
  {
    profile: { id: string; thumbnail: string; email: string; name: string };
    exists: boolean;
  },
  string
>;
export type SocialLoginAction = GenericResponseAction<
  {
    user: {
      _id: string;
      email: string;
      profile: {
        username: string;
        thumbnail: string;
        shortBio: string;
      };
    };
  },
  string
>;
export type ChangeInputAction = ReturnType<typeof authCreators.changeInput>;
export type SetErrorAction = ReturnType<typeof authCreators.setError>;
export type SetNextUrlAction = ReturnType<typeof authCreators.setNextUrl>;
export type AutoCompleteRegisterFormAction = ReturnType<
  typeof authCreators.autoCompleteRegisterForm
>;
