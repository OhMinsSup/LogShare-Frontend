import { GenericResponseAction } from 'src/lib/common';
import { userCreators, UserProfileState, UserEditProfileState } from '../user';

export type ProcessPayload = {
  authResult: {
    _id: string;
    username: string;
    thumbnail: string;
    shortBio: string;
    email: string;
  };
};
export type CreateUploadUserFilePayload = {
  file: File;
};
export type EditProfilePayload = {
  username: string;
  shortBio: string;
  thumbnail: string;
  cover: string;
};
export type ChangeInputPayload = { name: string; value: string };
export type GetUserProfileInfoPayload = {
  username: string;
};
export type ChangeInputAction = ReturnType<typeof userCreators.changeInput>;
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
export type CreateUploadUserFileAction = GenericResponseAction<
  {
    url: string;
  },
  string
>;
export type EditProfileAction = GenericResponseAction<
  {
    profile: UserEditProfileState;
    status: boolean;
  },
  string
>;
