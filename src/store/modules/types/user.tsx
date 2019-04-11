import { GenericResponseAction } from 'src/lib/common';
import { UserProfileState, UserEditProfileState } from '../user';

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
