import { GenericResponseAction } from 'src/lib/common';
import { userCreators } from '../user';

export type ProcessPayload = {
  authResult: {
    _id: string;
    username: string;
    thumbnail: string;
    shortBio: string;
    email: string;
  };
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
