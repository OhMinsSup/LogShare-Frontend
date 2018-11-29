import { GenericResponseAction } from 'src/lib/common';
import { userCreators, UserProfileState } from '../user';

export type ProcessPayload = {
  authResult: {
    _id: string;
    username: string;
    thumbnail: string;
    shortBio: string;
    email: string;
  };
};
export type GetUserProfileInfoPayload = {
  username: string;
};
export type ProcessAction = ReturnType<typeof userCreators.process>;
export type SetUserAction = GenericResponseAction<
  {
    authResult: {
      username: string;
      thumbnail: string;
      shortBio: string;
      email: string;
      _id: string;
    };
  },
  string
>;
export type GetUserProfileInfoAction = GenericResponseAction<
  {
    profile: UserProfileState;
  },
  string
>;
