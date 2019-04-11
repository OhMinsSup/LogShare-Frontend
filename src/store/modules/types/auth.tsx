import { GenericResponseAction } from 'src/lib/common';

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
