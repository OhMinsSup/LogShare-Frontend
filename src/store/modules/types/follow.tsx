import { GenericResponseAction } from 'src/lib/common';

export type FollowPayload = {
  username: string;
};

export type FollowAction = GenericResponseAction<
  {
    follow: boolean;
  },
  string
>;
