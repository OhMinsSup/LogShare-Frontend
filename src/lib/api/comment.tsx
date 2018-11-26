import axios from 'axios';

type WriteCommentPayload = {
  postId: string;
  text: string;
  reply: string | null;
};
type UpdateCommentPayload = {
  commentId: string;
  postId: string;
  text: string;
};
type DeleteCommentPayload = {
  commentId: string;
  postId: string;
};
type GetReplyPayload = {
  commentId: string;
  postId: string;
};

export const writeComment = ({ postId, text, reply }: WriteCommentPayload) =>
  axios.post(`/post/${postId}/comment`, { text, reply });

export const updateComment = ({
  postId,
  text,
  commentId,
}: UpdateCommentPayload) =>
  axios.put(`/post/${postId}/comment/${commentId}`, { text });

export const deleteComment = ({ postId, commentId }: DeleteCommentPayload) =>
  axios.delete(`/post/${postId}/comment/${commentId}`);

export const getComment = (postId: string) =>
  axios.get(`/post/${postId}/comment`);

export const getReply = ({ postId, commentId }: GetReplyPayload) =>
  axios.get(`/post/${postId}/comment/${commentId}/reply`);
