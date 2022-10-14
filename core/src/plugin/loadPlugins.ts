
import {createPlugin} from '../utils/internal/factory';

export default function loadPlugins():any[]{
  const plugins: any[] = [];
  let instance: any;
  if(window.__lincy_vue_plugins__app){
    instance = window.__lincy_vue_plugins__app.default || window.__lincy_vue_plugins__app;
    plugins.push(createPlugin('app',instance));
  }
  if(window.__lincy_vue_plugins__router){
    instance = window.__lincy_vue_plugins__router.default || window.__lincy_vue_plugins__router;
    plugins.push(createPlugin('router',instance));
  }

  if(window.__lincy_vue_plugins__http){
    instance = window.__lincy_vue_plugins__http.default || window.__lincy_vue_plugins__http;
    plugins.push(createPlugin('http',instance));
  }
  if(window.__lincy_vue_plugins__component){
    instance = window.__lincy_vue_plugins__component.default || window.__lincy_vue_plugins__component;
    plugins.push(createPlugin('component',instance));
  }
  if(window.__lincy_vue_plugins__track){
    instance = window.__lincy_vue_plugins__track.default || window.__lincy_vue_plugins__track;
    plugins.push(createPlugin('track',instance));
  }
  return plugins;
}