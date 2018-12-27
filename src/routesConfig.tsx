import { bindActionCreators } from 'redux';
import { match } from 'react-router-dom';
import { postsCreators } from './store/modules/list/posts';

const routes = [
  {
    path: '/recent' || '/',
    preload: async (ctx: any, { dispatch }: any, match: match<any>) => {
      const ListActions = bindActionCreators(postsCreators, dispatch);
      return ListActions.getPosts({ username: null });
    },
  },
];

export default routes;
