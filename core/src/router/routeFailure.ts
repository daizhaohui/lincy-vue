import {IRouteLocationNormalized,IRouteFailure} from '../types/router';
import {createRouteLocationNormalized} from '../utils/internal/factory';

export default class RouteFailure implements IRouteFailure{

  constructor(failure:any){
    this.type = failure.type;
    this.to = createRouteLocationNormalized(failure.to);
    this.from = createRouteLocationNormalized(failure.from);
  }

  type: any;
  to: IRouteLocationNormalized;
  from: IRouteLocationNormalized;
}