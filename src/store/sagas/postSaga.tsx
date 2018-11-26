import { fork, takeEvery, put, call, all } from 'redux-saga/effects';
import { PostActionType } from '../modules/post';
import { ErrorActionType } from '../modules/error';
import * as PostType from './types/post';
import * as PostAPI from '../../lib/api/post';
import * as CommentAPI from '../../lib/api/comment';

function* readPost(action: any) {
  const {
    payload: { postId },
  }: PostType.ReadPostPayload = action;

  try {
    const responseReadPost: PostType.ReadPostResponse = yield call(
      PostAPI.readPost,
      postId
    );

    yield put({
      type: PostActionType.READ_POST_SUCCESS,
      payload: {
        postData: responseReadPost.data,
      },
    });
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* like(action: any) {
  const {
    payload: { postId },
  } = action;

  yield put({
    type: PostActionType.LIKE_REQUEST,
  });

  try {
    const responseLike = yield call(PostAPI.like, postId);

    yield put({
      type: PostActionType.LIKE_SUCCESS,
      payload: {
        liked: responseLike.data.liked,
        likes: responseLike.data.likes,
      },
    });
  } catch (e) {
    yield put({
      type: PostActionType.LIKE_ERROR,
    });
  }
}

function* unlike(action: any) {
  const {
    payload: { postId },
  }: PostType.LikePayload = action;

  yield put({
    type: PostActionType.UNLIKE_REQUEST,
  });

  try {
    const responseLike: PostType.LikeResponse = yield call(
      PostAPI.unlike,
      postId
    );

    yield put({
      type: PostActionType.UNLIKE_SUCCESS,
      payload: {
        liked: responseLike.data.liked,
        likes: responseLike.data.likes,
      },
    });
  } catch (e) {
    yield put({
      type: PostActionType.UNLIKE_ERROR,
    });
  }
}

function* postSequences(action: any) {
  const {
    payload: { postId },
  }: PostType.PostSequencesPayload = action;

  try {
    const responseSequences: PostType.PostSequencesResponse = yield call(
      PostAPI.sequences,
      postId
    );

    yield put({
      type: PostActionType.POST_SEQUENCES_SUCCESS,
      payload: {
        sequences: responseSequences.data,
      },
    });
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* deletePost(action: any) {
  const {
    payload: { postId },
  }: PostType.DeletePostPayload = action;

  try {
    yield call(PostAPI.deletePost, postId);
    window.location.href = '/';
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* writeComment(action: any) {
  const {
    payload: { postId, text, reply },
  } = action;

  try {
    const responseWriteComment = yield call(CommentAPI.writeComment, {
      postId,
      text,
      reply,
    });

    yield put({
      type: PostActionType.WRITE_COMMENT_SUCCESS,
      payload: {
        status: responseWriteComment.status === 204 ? true : false,
      },
    });
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* readComment(action: any) {
  const {
    payload: { postId },
  } = action;

  try {
    const responseReadComment = yield call(CommentAPI.getComment, postId);

    yield put({
      type: PostActionType.READ_COMMENTS_SUCCESS,
      payload: {
        comments: responseReadComment.data,
      },
    });
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* readSubComment(action: any) {
  const {
    payload: { postId, commentId, parentId },
  } = action;

  try {
    const responseReadSubComment = yield call(CommentAPI.getReply, {
      postId,
      commentId,
    });

    yield put({
      type: PostActionType.READ_SUBCOMMENTS_SUCCESS,
      payload: {
        postId,
        commentId,
        parentId,
        subComments: responseReadSubComment.data,
      },
    });
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* deleteComment(action: any) {
  const {
    payload: { postId, commentId },
  } = action;

  try {
    yield call(CommentAPI.deleteComment, { postId, commentId });

    yield put({
      type: PostActionType.DELETE_COMMENT_SUCCESS,
    });
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* editComment(action: any) {
  const {
    payload: { postId, commentId, text },
  } = action;

  try {
    const responseEditComment = yield call(CommentAPI.updateComment, {
      postId,
      commentId,
      text,
    });

    yield put({
      type: PostActionType.EDIT_COMMENT_SUCCESS,
      payload: {
        status: responseEditComment.status === 204 ? true : false,
      },
    });
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        error: true,
        code: e.response.status,
      },
    });
  }
}

function* watchEditComment() {
  yield takeEvery(PostActionType.EDIT_COMMENT_REQUEST, editComment);
}

function* watchDeleteComment() {
  yield takeEvery(PostActionType.DELETE_COMMENT_REQUEST, deleteComment);
}

function* watchReadSubComment() {
  yield takeEvery(PostActionType.READ_SUBCOMMENTS_REQUEST, readSubComment);
}

function* watchReadComment() {
  yield takeEvery(PostActionType.READ_COMMENTS_REQUEST, readComment);
}

function* watchWriteComment() {
  yield takeEvery(PostActionType.WRITE_COMMENT_REQUEST, writeComment);
}

function* watchReadPost() {
  yield takeEvery(PostActionType.READ_POST_REQUEST, readPost);
}

function* watchLike() {
  yield takeEvery(PostActionType.LIKE, like);
}

function* watchUnLike() {
  yield takeEvery(PostActionType.UNLIKE, unlike);
}

function* watchPostSequences() {
  yield takeEvery(PostActionType.POST_SEQUENCES_REQUEST, postSequences);
}

function* watchDeletePost() {
  yield takeEvery(PostActionType.DELETE_POST, deletePost);
}

export default function* postSaga() {
  yield all([
    fork(watchReadPost),
    fork(watchLike),
    fork(watchUnLike),
    fork(watchPostSequences),
    fork(watchDeletePost),
    fork(watchWriteComment),
    fork(watchReadComment),
    fork(watchReadSubComment),
    fork(watchDeleteComment),
    fork(watchEditComment),
  ]);
}
