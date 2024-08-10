import { createSlice } from '@reduxjs/toolkit';
// api
import * as boardAPI from '../../api/board';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  isLoading: false,
  init: false,
  error: null,
  filter: null,
  posts: [],
  view: null,
  sortBy: null,
  page: {
    path: 'list',
  },
};

const slice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    // start loading
    startLoading(state) {
      state.isLoading = true;
    },

    // end loading
    endLoading(state) {
      state.isLoading = false;
    },

    // has error
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    setFilter(state, action) {
      state.filter = action.payload;
    },

    getPostsSuccess(state, action) {
      state.init = true;
      state.isLoading = false;
      state.posts = action.payload;
    },

    getPostSuccess(state, action) {
      state.isLoading = false;
      state.view = action.payload;
      state.page.path = 'edit';
    },

    savePostSuccess(state) {
      state.init = false;
      state.isLoading = false;
      state.page.path = 'list';
      state.view = null;
    },

    editPostSuccess(state) {
      state.init = false;
      state.isLoading = false;
      state.page.path = 'list';
      state.view = null;
    },

    onMoveNew(state) {
      state.page.path = 'new';
    },

    onMoveList(state) {
      state.page.path = 'list';
      state.view = null;
    },

    // 상태 초기화
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

// reducer
export default slice.reducer;

// actions
export const { setFilter, reset, onMoveList, onMoveNew } = slice.actions;

// ----------------------------------------------------------------------

interface IPost {
  userId: string
  id: number;
  title: string;
  body: string;
}

/** 게시글 목록 조회 */
export function getPosts(userId: IPost["userId"], filterName: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await boardAPI.posts(userId?.length > 0 ? userId : null);
      if (filterName) {
        const filtered = response.filter(
          (post: IPost) =>
            post.title.toLowerCase().indexOf(filterName.toLowerCase()) !== -1 ||
            post.body.indexOf(filterName.toLowerCase()) !== -1,
        );

        dispatch(slice.actions.getPostsSuccess(filtered));
      } else {
        dispatch(slice.actions.getPostsSuccess(response));
      }
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// 게시글 상세 조회 (post + comments)
export function getPost(post: IPost) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const comments = await boardAPI.comments(post.id);
      const payload = {
        post: post,
        comments: comments,
      }
      dispatch(slice.actions.getPostSuccess(payload));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  }
}

// 게시글 저장
export function savePost(post: IPost) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const resp = await boardAPI.savePost(post);
      console.log('saved values: ', resp);
      dispatch(slice.actions.savePostSuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// 게시글 수정
export function editPost(post: IPost) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const resp = await boardAPI.editPost(post);
      console.log('updated values: ', resp);
      // dispatch(slice.actions.editPostSuccess());
      // or 결과 수동 처리 
      dispatch(slice.actions.endLoading);
      return resp;
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// 게시글 삭제
export function deletePost(id: IPost["id"]) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await boardAPI.deletePost(id);
      dispatch(slice.actions.endLoading());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
