import webpackMerge from 'webpack-merge';
import {createBuildContext} from '../utils/factory';
import BuildProject from './buildProject';
import CommonWebpackConfig from '../../config/comomon.webpack.config';
import DevWebpackConfig from '../../config/dev.webpack.config';
import ProdWebpackConfig from '../../config/prod.webpack.config';
import {Mode} from '../consts';
import BuildUtil from './util';
import ThemeUtil from './theme';
import path from 'path';

 function build(options:any){
  const cwd = process.cwd();
  const packageConfig = require(path.join(cwd,'package.json'));
  let webpackConfig;
  const cliConfig = BuildUtil.getCliConfig(options,cwd);
  const themes = ThemeUtil.getThemes(cwd,cliConfig);
  const commonConfigOptions = {
    rootPath: cwd,
    isMobile: BuildUtil.isMobile(options),
    isTs: BuildUtil.isTS(options,cwd),
    report: !!options.report,
    themes,
    mode: options.mode,
    htmlTemplate: options.template+'',
    // 指定编译的皮肤，不指定，编译themes目录下所有皮肤
    compileThemeName: options.theme,
    cliConfig,
    packageConfig
  };
  if(options.mode === Mode.Prod){
    webpackConfig = webpackMerge([CommonWebpackConfig(commonConfigOptions),ProdWebpackConfig(commonConfigOptions)]);
  } else {
    webpackConfig = webpackMerge([CommonWebpackConfig(commonConfigOptions),DevWebpackConfig(commonConfigOptions)]);
  }
  commonConfigOptions.themes = Object.keys(commonConfigOptions.themes);
  const themeWebpackConfigs = ThemeUtil.getThemeWebpackConfigs(commonConfigOptions);
  new BuildProject(createBuildContext(options,cliConfig,webpackConfig,cwd,{
    themes:commonConfigOptions.themes,
    themeWebpackConfigs,
  },packageConfig)).run();
}

module.exports = build;