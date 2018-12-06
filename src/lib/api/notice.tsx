import axios from 'axios';

export const checkNotice = () => axios.post('/common/notice/');
export const simpleNoticeMesssage = () => axios.get('/common/notice/simple');
export const sendMessage = (message: string) =>
  axios.post('/common/notice/send-message', { message });
