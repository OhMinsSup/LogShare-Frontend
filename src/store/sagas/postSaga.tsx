import { fork, takeEvery, put, call, all } from 'redux-saga/effects';
import {
  PostActionType,
  CommentDataState,
  PostSequenceState,
  PostDataState,
} from '../modules/post';
import { ErrorActionType } from '../modules/error';
import * as PostAPI from '../../lib/api/post';
import * as CommentAPI from '../../lib/api/comment';
import { Action } from 'redux';
import { AxiosResponse } from 'axios';

export interface FetchReadPost
  extends Action<PostActionType.READ_POST_REQUEST> {
  payload: {
    postId: string;
  };
}

export interface FetchLike extends Action<PostActionType.LIKE> {
  payload: {
    postId: string;
  };
}

export interface FetchUnLike extends Action<PostActionType.UNLIKE> {
  payload: {
    postId: string;
  };
}

export interface FetchPostSequences
  extends Action<PostActionType.POST_SEQUENCES_REQUEST> {
  payload: {
    postId: string;
  };
}

export interface FetchDeletePost extends Action<PostActionType.DELETE_POST> {
  payload: {
    postId: string;
  };
}

export interface FetchWriteComment
  extends Action<PostActionType.WRITE_COMMENT_REQUEST> {
  payload: {
    postId: string;
    text: string;
    reply: string;
  };
}

export interface FetchReadComments
  extends Action<PostActionType.READ_COMMENTS_REQUEST> {
  payload: {
    postId: string;
  };
}

export interface FetchReadSubComments
  extends Action<PostActionType.READ_SUBCOMMENTS_REQUEST> {
  payload: {
    postId: string;
    commentId: string;
    parentId: string;
  };
}

export interface FetchDeleteComment
  extends Action<PostActionType.DELETE_COMMENT_REQUEST> {
  payload: {
    postId: string;
    commentId: string;
  };
}

export interface FetchEditComment
  extends Action<PostActionType.EDIT_COMMENT_REQUEST> {
  payload: {
    postId: string;
    commentId: string;
    text: string;
  };
}

export interface LikeState {
  liked: boolean;
  likes: number;
}

function* readPost(action: FetchReadPost) {
  const {
    payload: { postId },
  } = action;

  try {
    const responseReadPost: AxiosResponse<PostDataState> = yield call(
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

function* like(action: FetchLike) {
  const {
    payload: { postId },
  } = action;

  yield put({
    type: PostActionType.LIKE_REQUEST,
  });

  try {
    const responseLike: AxiosResponse<LikeState> = yield call(
      PostAPI.like,
      postId
    );

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

function* unlike(action: FetchUnLike) {
  const {
    payload: { postId },
  } = action;

  yield put({
    type: PostActionType.UNLIKE_REQUEST,
  });

  try {
    const responseLike: AxiosResponse<LikeState> = yield call(
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

function* postSequences(action: FetchPostSequences) {
  const {
    payload: { postId },
  } = action;

  try {
    const responseSequences: AxiosResponse<PostSequenceState[]> = yield call(
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

function* deletePost(action: FetchDeletePost) {
  const {
    payload: { postId },
  } = action;

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

function* writeComment(action: FetchWriteComment) {
  const {
    payload: { postId, text, reply },
  } = action;

  try {
    const responseWriteComment: AxiosResponse<any> = yield call(
      CommentAPI.writeComment,
      {
        postId,
        text,
        reply,
      }
    );

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

function* readComment(action: FetchReadComments) {
  const {
    payload: { postId },
  } = action;

  try {
    const responseReadComment: AxiosResponse<CommentDataState[]> = yield call(
      CommentAPI.getComment,
      postId
    );

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

function* readSubComment(action: FetchReadSubComments) {
  const {
    payload: { postId, commentId, parentId },
  } = action;

  try {
    const responseReadSubComment: AxiosResponse<
      CommentDataState[]
    > = yield call(CommentAPI.getReply, {
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

function* deleteComment(action: FetchDeleteComment) {
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

function* editComment(action: FetchEditComment) {
  const {
    payload: { postId, commentId, text },
  } = action;

  try {
    const responseEditComment: AxiosResponse<any> = yield call(
      CommentAPI.updateComment,
      {
        postId,
        commentId,
        text,
      }
    );

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
