import { put, call, takeEvery, fork, all } from 'redux-saga/effects';
import * as searchAPI from '../../lib/api/search';
import { SearchActionType } from '../modules/search';
import { ErrorActionType } from '../modules/error';
import { Action } from 'redux';

export interface FetchPublicSearch
  extends Action<SearchActionType.PUBLIC_SEARCH_REQUEST> {
  payload: { q: string; username?: string; page?: number };
}

export interface FetchNextPublicSearch
  extends Action<SearchActionType.NEXT_PUBLIC_SEARCH_REQUEST> {
  payload: { q: string; username?: string; page?: number };
}

function* publicSearch(action: FetchPublicSearch) {
  const { q, username, page } = action.payload;

  yield put({
    type: SearchActionType.PUBLIC_SEARCH_PENDING,
    payload: action.payload,
  });

  try {
    const search = yield call(searchAPI.search, { q, username, page });

    if (search.data.error && !search.data.ok) {
      yield put({
        type: ErrorActionType.ERROR,
        payload: {
          ok: true,
          error: '검색한 데이터를 가져오지 못했습니다.',
        },
      });
      return;
    }

    yield put({
      type: SearchActionType.PUBLIC_SEARCH_SUCCESS,
      payload: {
        result: search.data.searchResult,
        count: search.data.count,
      },
    });
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        ok: true,
        error: e,
      },
    });
  }
}

function* nextPublicSearch(action: FetchNextPublicSearch) {
  const { q, username, page } = action.payload;

  yield put({
    type: SearchActionType.NEXT_PUBLIC_SEARCH_PENDING,
    payload: action.payload,
  });

  try {
    const search = yield call(searchAPI.search, { q, username, page });

    if (search.data.error && !search.data.ok) {
      yield put({
        type: ErrorActionType.ERROR,
        payload: {
          ok: true,
          error: '검색한 데이터를 가져오지 못했습니다.',
        },
      });
      return;
    }

    yield put({
      type: SearchActionType.NEXT_PUBLIC_SEARCH_SUCCESS,
      payload: {
        result: search.data.searchResult,
        count: search.data.count,
      },
    });
  } catch (e) {
    yield put({
      type: ErrorActionType.ERROR,
      payload: {
        ok: true,
        error: e,
      },
    });
  }
}

function* watchPublicSearch() {
  yield takeEvery(SearchActionType.PUBLIC_SEARCH_REQUEST, publicSearch);
}

function* watchNextPublicSearch() {
  yield takeEvery(
    SearchActionType.NEXT_PUBLIC_SEARCH_REQUEST,
    nextPublicSearch
  );
}

export default function* search() {
  yield all([fork(watchPublicSearch), fork(watchNextPublicSearch)]);
}
