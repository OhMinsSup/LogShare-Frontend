import axios from 'axios';

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
export const unregisterToken = () => axios.get('/unregister-token');
export const unregister = (unregister_token: string) =>
  axios.post('/unregister', { unregister_token });
