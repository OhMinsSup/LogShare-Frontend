import axios from '../defaultClient';

type EditProfilePayload = {
  thumbnail: string;
  shortBio: string;
  username: string;
  cover: string;
};

export const getUserInfo = (username: string) =>
  axios.get(`/user/info/@${username}`);
export const editProfile = ({
  username,
  thumbnail,
  cover,
  shortBio,
}: EditProfilePayload) =>
  axios.post('/user/profile', { username, thumbnail, cover, shortBio });
