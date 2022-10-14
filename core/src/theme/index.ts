const _removeLinks = (urls:string[]):void=>{
  const links = document.getElementsByTagName('link');
  urls.forEach(url=>{
    let i;
    let link;
    for(i=0;i<links.length;i++){
      link = links[i];
      if(link.href.indexOf(url)!==-1){
        link.remove();
        i = i - 1;
      }
    }
  });
};

const _addCssLinks = (urls:string[]):void=>{
  const addLinks:string[] = [];
  const links = document.getElementsByTagName('link');
  let isExist;
  let i;
  let link;
  urls.forEach(url=>{
    isExist = false;
    for(i=0;i<links.length;i++){
      link = links[i];
      if(link.href.indexOf(url)!==-1){
        isExist = true;
        break;
      }
    }
    if(!isExist){
      addLinks.push(url);
    }
  });
  const head = document.getElementsByTagName('head')[0];
  let linkTag;
  addLinks.forEach((themeUrl:string)=>{
    linkTag = document.createElement('link');
    linkTag.href = themeUrl;
    linkTag.setAttribute('rel','stylesheet');
    linkTag.setAttribute('media','all');
    linkTag.setAttribute('type','text/css');
    head.appendChild(linkTag);
  });
};

const _getRemovedCssUrls = ():string[]=>{
  const themes:any = window.__themes__;
  const current = themes &&  themes.current;
  let urls:string[] = [];
  if(current){
    urls = urls.concat(themes.urls[current]);
  }
  if(themes.cssUrls && themes.cssUrls.length){
    urls = urls.concat(themes.cssUrls);
  }
  return urls;
};

const _setTheme = (name:string):void=>{
  const themes:any = window.__themes__;
  const themeUrls = themes && themes.urls && themes.urls[name];
  const current = themes &&  themes.current;
  if(themeUrls && current !== name){
    // 添加新的theme
    _addCssLinks(themeUrls);
    // 移除之前的theme和css
    _removeLinks(_getRemovedCssUrls());
    themes.current = name;
  }
};

const _getAllThemeCssUrls = ():string[]=>{
  const themes:any = window.__themes__;
  let urls:string[] = [];
  Object.keys(themes.urls).forEach(key=>{
    urls = urls.concat(themes.urls[key]);
  });
  return urls;
};


 export function setTheme(name:string):void{
  const themes:any = window.__themes__;
  const current = themes &&  themes.current;
   if(name){
    _setTheme(name);
   } else if(current){
     clearTheme();
   }
 }

 export function clearTheme():void{
  const themes:any = window.__themes__;
  themes.current = '';
  // 添加非皮肤样式
  themes.cssUrls && _addCssLinks(themes.cssUrls);
  _removeLinks(_getAllThemeCssUrls());
  
 }

 export function resetTheme():void{
  const themes:any = window.__themes__;
  const urls = themes && themes.urls;
  const defaultTheme = themes && themes.default;
  if(urls){
    if(defaultTheme){
      _setTheme(defaultTheme);
    }else {
      themes.current = '';
      themes.cssUrls && _addCssLinks(themes.cssUrls);
      _removeLinks(_getAllThemeCssUrls());
    }  
  } else {
     // 添加非皮肤样式
     themes.cssUrls && _addCssLinks(themes.cssUrls);
  }
 }

 export function getDefaultTheme():string|null{
  const themes:any = window.__themes__;
  const defaultTheme = themes && themes.default;
  return defaultTheme || '';
 }

 // 是否有可用的皮肤
 export function hasTheme():boolean{
  const themes:any = window.__themes__;
  return themes && themes.urls && Object.keys(themes.urls).length ? true : false;
 }
