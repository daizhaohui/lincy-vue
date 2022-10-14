
import {Mode} from '../consts';
const build = require('../build');

module.exports = (options:any)=>{
  options.startServer = true;
  options.mode = Mode.Dev;
  build(options);
};