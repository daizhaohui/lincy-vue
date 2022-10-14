import { UILibrary } from "../consts";


export default class UIUtil{


  static getDesktopUI():string[]{
    return [
      UILibrary.AntDesignVue,
      UILibrary.ElementUI,
    ]
  }

  static getMobileUI():string[]{
    return [
      UILibrary.Vant
    ]
  }

}