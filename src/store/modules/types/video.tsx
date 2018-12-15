import { GenericResponseAction } from 'src/lib/common';

export type CreateUploadUrlVideoPayload = {
  file: File;
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
