import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router';
import { Provider } from 'react-redux';
import configure from './store/configureStore';
import routesConfig from './routesConfig';
import App from './App';

const serverRender = async (ctx: any) => {
  const store = configure();
  const promises: any[] = [];

  routesConfig.every((route: any) => {
    const match = matchPath(ctx.path, route);
    if (match) {
      if (route.preload) {
        promises.push(route.preload(ctx, store.dispatch, match));
      }
      if (route.stop) return false;
    }
    return true;
  });

  try {
    await Promise.all(promises);
  } catch (e) {
    throw e;
  }

  const context = {};
  const html = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter context={context} location={ctx.url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  return {
    html,
    context,
    state: store.getState(),
  };
};

export default serverRender;