import axios from 'axios';

type EditProfilePayload = {
  thumbnail: string;
  shortBio: string;
  username: string;
  cover: string;
};

export const getUserInfo = (username: string) =>
  axios.get(`/common/user/info/@${username}`);
export const editProfile = ({
  username,
  thumbnail,
  cover,
  shortBio,
}: EditProfilePayload) =>
  axios.post('/common/user/profile', { username, thumbnail, cover, shortBio });
