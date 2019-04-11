import axios from '../defaultClient';

type ProfileLinksPayload = {
  github: string;
  facebook: string;
  twitter: string;
};

export const getProfileInfo = () => axios.get('/common/profile-info');
export const updateProfileLinks = ({
  github,
  facebook,
  twitter,
}: ProfileLinksPayload) =>
  axios.post('/common/profile-links', { github, facebook, twitter });
export const updateEmailPermissions = (email_promotion: boolean) =>
  axios.post('/common/email-permission', { email_promotion });
export const unregisterToken = () => axios.get('/auth/unregister-token');
export const unregister = (unregister_token: string) =>
  axios.post('/auth/unregister', { unregister_token });
