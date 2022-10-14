import {useAuth} from '../auth';
import {IAuthService} from '../types/auth';

export default {
  name: 'auth',
  implement:{
    mounted(el:any,binding:any) {
      const vals:string[] = binding.value.split('|');
      const authService:IAuthService | null = useAuth();
      const num = Number(vals[1]);
      const has = authService && authService.has(vals[0],isNaN(num)?undefined:num,vals[2]);
      if( vals.length>0 && authService && has===false){
        el.parentNode.removeChild(el);
      }
    },
  }
}