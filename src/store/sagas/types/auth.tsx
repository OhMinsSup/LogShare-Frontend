import { History } from 'history';

export type LocalRegisterPayload = {
  payload: { email: string; username: string; password: string };
};
export type LocalLoginPayload = {
  payload: { email: string; password: string };
};
export type LocalLoginResponse = {
  data: {
    user: {
      _id: string;
      email: string;
      profile: {
        username: string;
        thumbnail: string;
        shortBio: string;
      };
    };
  };
};
export type LocalRegisterResponse = {
  data: {
    user: {
      _id: string;
      email: string;
      profile: {
        username: string;
        thumbnail: string;
        shortBio: string;
      };
    };
  };
};
export type GetProviderTokenPayload = {
  payload: { provider: string; next: string; history: History };
};
export type GetProviderTokenResponse = {
  data: {
    token: string;
  };
};
export type VerifySocialResponse = {
  data: {
    profile: { id: string; thumbnail: string; email: string; username: string };
    exists: boolean;
  };
};
export type SocialRegisterPayload = {
  payload: {
    accessToken: string;
    provider: string;
    username: string;
  };
};
export type SocialRegisterResponse = {
  data: {
    user: {
      _id: string;
      email: string;
      profile: {
        username: string;
        thumbnail: string;
        shortBio: string;
      };
    };
  };
};
export type SocialLoginResponse = {
  data: {
    user: {
      _id: string;
      email: string;
      profile: {
        username: string;
        thumbnail: string;
        shortBio: string;
      };
    };
  };
};
export type ChekcExistsPayload = { payload: { key: string; value: string } };
export type ChekcExistsResponse = {
  data: { exists: boolean };
};
