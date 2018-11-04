import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import './styles/main.scss';

const render = (window as any).__REDUX_STATE__
  ? ReactDOM.hydrate
  : ReactDOM.render;

render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();
