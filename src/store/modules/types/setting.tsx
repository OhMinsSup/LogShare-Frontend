import { GenericResponseAction } from 'src/lib/common';
import { ProfileState } from '../setting';

export type UpdateProfileLinksPayload = {
  github: string;
  twitter: string;
  facebook: string;
};
export type UpdateEmailPermissionsPayload = {
  email_promotion: boolean;
};

export type GetProfileInfoAction = GenericResponseAction<
  {
    profile: ProfileState;
  },
  string
>;
export type UpdateProfileLinksAction = GenericResponseAction<
  {
    profile_linkes: {
      github: string;
      twiiter: string;
      facebook: string;
    };
    askSetting: boolean;
  },
  string
>;
export type UpdateEmailPermissionsAction = GenericResponseAction<
  {
    email_promotion: boolean;
    askSetting: boolean;
  },
  string
>;
