import axios from '../defaultClient';

export const checkNotice = () => axios.post('/notice/');
export const simpleNoticeMesssage = () => axios.get('/notice/simple');
export const sendMessage = (message: string) =>
  axios.post('/notice/send-message', { message });
