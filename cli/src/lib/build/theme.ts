import fs from 'fs';
import path from 'path';
import getThemeWebPackConfig from '../../config/theme.webpack.config';
import { ICliConfig } from '../typedefines';
export default class ThemeUtil{

  // 获取所有的theme
  static getThemes(rootPath:string,cliConfig:ICliConfig):any{
    const themes:any = {};
    if(cliConfig.theme && cliConfig.theme.enabled===true){
      const themesDir = path.join(rootPath,'/src/themes');
      const files = fs.readdirSync(themesDir);
      files.forEach((f:any)=>{
        const dir = path.join(themesDir, f);
        const stat = fs.lstatSync(dir);
        if(stat.isDirectory()){
          const themeFiles = fs.readdirSync(dir);
          const lessFile = themeFiles.includes('index.less') ? 'index.less' :null;
          if(lessFile){
            themes[f] = path.join('/src/themes',f,lessFile);
          } else {
            themes[f]  = null;
          }
        }
      });
    }
    return themes;
  }

  static getThemeWebpackConfigs(options:any):any[]{
    const { compileThemeName, themes } = options;
    const configs:any[] = [];
    // 没有制定具体的编译皮肤，独立编译所有的皮肤样式
    if(!compileThemeName){
      themes.forEach((theme:string)=>{
        configs.push(getThemeWebPackConfig({
          ...options,
          theme
        }));
      });
    }
    return configs;
  }
}