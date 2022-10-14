import { HtmlTemplate } from "../consts";

const HtmlTemplateMap = {
  [HtmlTemplate.Desktop]: 'desktop.html',
  [HtmlTemplate.Mobile]: 'mobile.html',
};


export default class HtmlTemplateUtil{


  static getTemplateFile(template:string):string{
    if(HtmlTemplateMap[template]){
      return HtmlTemplateMap[template];
    }
    return HtmlTemplateMap[HtmlTemplate.Desktop];
  }

  static getAllTemplateNames():string[]{
    return [
      HtmlTemplate.Desktop,
      HtmlTemplate.Mobile
    ]
  }

}