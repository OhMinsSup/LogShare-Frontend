import axios from 'axios';

type VideoPayload = {
  video_thumbnail: string;
  video_url: string;
  title: string;
  description: string | null;
  time: string;
  category: string;
  format: string;
};

export const createVideo = ({
  video_thumbnail,
  video_url,
  title,
  description,
  category,
  time,
  format,
}: VideoPayload) =>
  axios.post('/video/', {
    video_thumbnail,
    video_url,
    title,
    description,
    category,
    time,
    format,
  });

export const getVideo = (videoId: string) => axios.get(`/video/${videoId}`);