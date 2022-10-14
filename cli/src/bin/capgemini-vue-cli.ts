#! /usr/bin/env node

import program from 'commander';

const cliPackageConfig = require('../package.json');

program
  .version(`@lincy-vue/cli ${cliPackageConfig.version}`)
  .usage('<command> [options]')

program
.command('create <app-name>')
.description('创建一个新工程')
.option('-p,--program [program]', '编程语言：js、ts','ts')
.option('-t,--template [template]', '选择html模板：desktop、mobile.', 'desktop')
.allowUnknownOption()
.action((name, options) => {
  require('../lib/create')(name, options)
});


program
.command('build')
.description('构建')
.option('-t,--template [template]', '选择html模板：desktop、mobile.', 'desktop')
.option('-m,--mode [mode]','开发还是生产模式','development')
.option('-p,--program [program]', '编程语言：js、ts','ts')
.option('-l,--language [language]', '语种', '')
.option('-e,--theme [theme]', '编译的皮肤名称', '')
.option('--report','打包分析报告')
.allowUnknownOption()
.action((options) => {
  require('../lib/build')(options)
});

program
.command('serve')
.option('-t,--template [template]', '选择html模板：desktop、phone.', 'desktop')
.option('-e --theme [theme]', '编译的皮肤名称', '')
.allowUnknownOption()
.action((options) => {
  require('../lib/serve')(options)
});

const p:any = process;
p.noDeprecation = true;
program.parse(process.argv);




