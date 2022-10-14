调试
  1.进入cli根目录
  2.npm install
  3.npm run dev
  4.进入__test__/app/cli目录执行 npm install
  5.回到__test__/目录执行  node ./app/cli/bin/capgemini-vue-cli create app (创建工程目录，测试cli的创建工程的命令)
  6.回到__test__/app目录执行 npm install
  7.回到__test__/app/cli 目录执行 npm install
  8. node ./cli/bin/capgemini-vue-cli.js serve
    node ./cli/bin/capgemini-vue-cli.js build

  在vscode添加调试信息：设置cwd的值(指定执行的当前目录），和args的值（设置cli命令的参数）
  {
      "type": "pwa-node",
      "request": "launch",
      "name": "Launch Program-cli",
      "skipFiles": [
        "<node_internals>/**"
      ],
      "program": "${workspaceFolder}/cli/__test__/app/cli/bin/capgemini-vue-cli",
      "outFiles": [
        "${workspaceFolder}/**/*.js"
      ],
      "args": ["build"],
       // "args": ["build","-m","production"],
      // "args": ["serve"],
      "cwd": "${workspaceFolder}/cli/__test__/app"
    }