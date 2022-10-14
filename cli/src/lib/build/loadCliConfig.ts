import fs from 'fs';
import path from 'path';

export default function LoadCliConfig(dir:string):any{
  const fileName = path.join(dir,'/cli.config.js');
  let ret = {};
  if(fs.existsSync(fileName)){
    ret = require(fileName);
  }
  return ret;
}