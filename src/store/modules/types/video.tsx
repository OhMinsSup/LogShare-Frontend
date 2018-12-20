import { GenericResponseAction } from 'src/lib/common';
import { SideVideoState, MainVideoState } from '../video';

export type CreateUploadUrlVideoPayload = {
  file: File;
};
export type GetVideoPayload = {
  videoId: string;
};

export type SubmitPayload = {
  time?: string;
  thumbnail?: string;
  format?: string;
  url: string;
  title: string;
  description: string;
  category: string;
};

export type SubmitVideoAction = GenericResponseAction<
  {
    videoId: string;
  },
  string
>;
export type CreateUploadUrlVideoAction = GenericResponseAction<
  {
    path: string;
    name: string;
    url: string;
    thumbnail?: string;
    time?: string;
    format?: string;
  },
  string
>;
export type SideVideosAction = GenericResponseAction<
  {
    videosWithData: SideVideoState[];
  },
  string
>;
export type MainVideoAction = GenericResponseAction<
  {
    video: MainVideoState;
  },
  string
>;
