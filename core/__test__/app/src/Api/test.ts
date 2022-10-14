// 1. https://tcc.taobao.com/cc/json/mobile_tel_segment.htm?tel=18916666069
// 2. http://www.kuaidi100.com/query?type=ems&postid=12233
// s:快递公司编码:申通=”shentong” EMS=”ems” 顺丰=”shunfeng” 圆通=”yuantong” 中通=”zhongtong” 韵达=”yunda” 天天=”tiantian” 汇通=”huitongkuaidi” 全峰=”quanfengkuaidi” 德邦=”debangwuliu” 宅急送=”zhaijisong”
// 3. https://www.v2ex.com/api/nodes/show.json?name=java

import { useHttp } from '../../../../src';
const { Http, HttpMethod} = useHttp();

type Func = (arg:any)=>void;


export default class TestApi{

  @Http("/queryTel")
  // tslint:disable-next-line:no-empty
  static get1(options:any):Promise<Func>{
    return;
  }

  @Http("/v2ex/test",HttpMethod.Get)
  // tslint:disable-next-line:no-empty
  static get2(options:any):Promise<Func>{
    return;
  }

  @Http("/v2ex/test",HttpMethod.Get)
  @Http("/queryTel")
  // tslint:disable-next-line:no-empty
  static get3(...options:any[]):Promise<Func>{
    return;
  }


}
