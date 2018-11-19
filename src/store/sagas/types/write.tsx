export type CreateUploadUrlPostPayload = {
  payload: {
    file: File;
  };
};

export type CreateUploadUrlPostResponse = {
  data: {
    url: string;
    path: string;
    name: string;
  };
};
