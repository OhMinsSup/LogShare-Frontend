import axios from '../defaultClient';

export const checkNotice = () => axios.post('/notice');
export const alreadyNoticeMesssage = () => axios.get('/notice/already');
export const sendMessage = (message: string) =>
  axios.post('/notice/send-message', { message });
