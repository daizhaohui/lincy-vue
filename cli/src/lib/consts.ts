const HtmlTemplate = {
  Desktop: 'desktop',
  Mobile: 'mobile'
};

const WebpackConfigEntryName = {
  app: '_main_'
}

const UILibrary = {
  ElementUI: 'element-ui',
  AntDesignVue: 'ant-design-vue',
  Vant: 'vant'
};

const Language = {
  Javascript: 'js',
  TypeScript: 'ts'
};

const Mode = {
  Dev: 'development',
  Prod: 'production'
};

const Locales = {
  /**
   * 简体中文(中国)
   */
  zh_CN:'zh_CN',
  /**
   * 英语(美国)
   */
  en_US:'en_US',
  /**
   * 繁体中文(台湾地区)
   */
  zh_TW:'zh_TW',
  /**
   * 繁体中文(香港)
   */
  zh_HK:'zh_HK',
  /**
   * 英语(英国)
   */
  en_GB:'en_GB',
  /**
   * 韩文(韩国)
   */
  ko_KR:'ko_KR',
  /**
   * 日语(日本)
   */
  ja_JP:'ja_JP',
  /**
   * 俄语(俄罗斯)
   */
  ru_RU:'ru_RU',
  /**
   * 法语(法国)
   */
  fr_FR:'fr_FR',
  /**
   * 德语(德国)
   */
  de_DE:'de_DE',

  /**
   * 英语(香港)
   */
  en_HK:'en_HK',
  /**
   * 英语(全球)
   */
  en_WW:'en_WW',
  /**
   * 英语(加拿大)
   */
  en_CA:'en_CA',
  /**
   * 英语(澳大利亚)
   */
  en_AU:'en_AU',
  /**
   * 英语(爱尔兰)
   */
  en_IE:'en_IE',
  /**
   * 英语(芬兰)
   */
  en_FI:'en_FI',
  /**
   * 芬兰语(芬兰)
   */
  fi_FI:'fi_FI',
  /**
   * 英语(丹麦)
   */
  en_DK:'en_DK',
  /**
   * 丹麦语(丹麦)
   */
  da_DK:'da_DK',
  /**
   * 英语(以色列)
   */
  en_IL:'en_IL',
  /**
   * 希伯来语(以色列)
   */
  he_IL:'he_IL',
  /**
   * 英语(南非)
   */
  en_ZA:'en_ZA',
  /**
   * 英语(印度)
   */
  en_IN:'en_IN',
  /**
   * 英语(挪威)
   */
  en_NO:'en_NO',
  /**
   * 英语(新加坡)
   */
  en_SG:'en_SG',
  /**
   * 英语(新西兰)
   */
  en_NZ:'en_NZ',
  /**
   * 英语(印度尼西亚)
   */
  en_ID:'en_ID',
  /**
   * 英语(菲律宾)
   */
  en_PH:'en_PH',
  /**
   * 英语(泰国)
   */
  en_TH:'en_TH',
  /**
   * 英语(马来西亚)
   */
  en_MY:'en_MY',
  /**
   * 英语(阿拉伯)
   */
  en_XA:'en_XA',
  /**
   * 荷兰语(荷兰)
   */
  nl_NL:'nl_NL',
  /**
   * 荷兰语(比利时)
   */
  nl_BE:'nl_BE',
  /**
   * 葡萄牙语(葡萄牙)
   */
  pt_PT:'pt_PT',
  /**
   * 葡萄牙语(巴西)
   */
  pt_BR:'pt_BR',

  /**
   * 法语(卢森堡)
   */
  fr_LU:'fr_LU',
  /**
   * 法语(瑞士)
   */
  fr_CH:'fr_CH',
  /**
   * 法语(比利时)
   */
  fr_BE:'fr_BE',
  /**
   * 法语(加拿大)
   */
  fr_CA:'fr_CA',
  /**
   * 西班牙语(拉丁美洲)
   */
  es_LA:'es_LA',
  /**
   * 西班牙语(西班牙)
   */
  es_ES:'es_ES',
  /**
   * 西班牙语(阿根廷)
   */
  es_AR:'es_AR',
  /**
   * 西班牙语(美国)
   */
  es_US:'es_US',
  /**
   * 西班牙语(墨西哥)
   */
  es_MX:'es_MX',
  /**
   * 西班牙语(哥伦比亚)
   */
  es_CO:'es_CO',
  /**
   * 西班牙语(波多黎各)
   */
  es_PR:'es_PR',
  /**
   * 德语(奥地利)
   */
  de_AT:'de_AT',
  /**
   * 德语(瑞士)
   */
  de_CH:'de_CH',

  /**
   * 意大利语(意大利)
   */
  it_IT:'it_IT',
  /**
   * 希腊语(希腊)
   */
  el_GR:'el_GR',
  /**
   * 挪威语(挪威)
   */
  no_NO:'no_NO',
  /**
   * 匈牙利语(匈牙利)
   */
  hu_HU:'hu_HU',
  /**
   * 土耳其语(土耳其)
   */
  tr_TR:'tr_TR',
  /**
   * 捷克语(捷克共和国)
   */
  cs_CZ:'cs_CZ',
  /**
   * 斯洛文尼亚语
   */
  sl_SL:'sl_SL',
  /**
   * 波兰语(波兰)
   */
  pl_PL:'pl_PL',
  /**
   * 瑞典语(瑞典)
   */
  sv_SE:'sv_SE',
  /**
   * 西班牙语 (智利)
   */
  es_CL:'es_CL',

};

const ThemeWebpackConfigEntryNameOfCustom = (theme:string):string=>{
  return `_${theme}_`
}

export {
  HtmlTemplate,
  UILibrary,
  Language,
  Mode,
  Locales,
  WebpackConfigEntryName,
  ThemeWebpackConfigEntryNameOfCustom
}