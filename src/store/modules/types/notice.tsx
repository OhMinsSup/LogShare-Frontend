import { NoticeMessageState } from '../notice';
import { GenericResponseAction } from 'src/lib/common';

export type CheckNoticeRoomAction = GenericResponseAction<
  {
    noticeId: string;
    creator: {
      username: string;
      shortBio: string;
      _id: string;
      thumbnail: string;
    };
  },
  string
>;
export type SimpleNoticeMessageAction = GenericResponseAction<
  {
    notices: NoticeMessageState[];
  },
  string
>;
