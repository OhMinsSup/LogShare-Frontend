import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Root from './Root';
import registerServiceWorker from './registerServiceWorker';
import './styles/main.scss';
import 'react-circular-progressbar/dist/styles.css';

const render = (window as any).__REDUX_STATE__
  ? ReactDOM.hydrate
  : ReactDOM.render;

render(<Root />, document.getElementById('root') as HTMLElement);
registerServiceWorker();

(function(d, s, id) {
  // tslint:disable-next-line:one-variable-per-declaration
  let js: any,
    fjs: any = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src =
    'https://connect.facebook.net/ko_KR/sdk.js#xfbml=1&version=v3.2&appId=1565906873518620&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
})(document, 'script', 'facebook-jssdk');
