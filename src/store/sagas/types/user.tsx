export type SetUserPayload = {
  payload: {
    authResult: {
      _id: string;
      username: string;
      thumbnail: string;
      shortBio: string;
      email: string;
    };
  };
};
