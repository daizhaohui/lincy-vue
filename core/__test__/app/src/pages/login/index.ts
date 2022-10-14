import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface';
import {useAuth} from  '../../../../../src/auth';
import { defineComponent, reactive, UnwrapRef,useRouter} from '../../../../../src';
import LoginInfo from '../../state/loginInfo';
import {useI18n} from '../../../../../src/lang';

interface FormState {
  user: string;
  password: string;
}

export default defineComponent({
  setup() {
    const formState: UnwrapRef<FormState> = reactive({
      user: '',
      password: '',
    });
    const handleFinish = (values: FormState) => {
      LoginInfo.userId='demo';
      const auth = useAuth();
      const arr = [];
      auth.clear();
      arr.push(auth.create("upload"));
      arr.push(auth.create("utils",1));
      arr.push(auth.create("next",0));
      arr.push(auth.create("update",1));
      arr.push(auth.create("http",1));
      arr.push(auth.create("test1",2,"test"));
      arr.push(auth.create("test1",1,"test"));
      auth.add(arr);
      const router = useRouter();
      router.push({
        name:'home',
        params:{
          id:1
        },
        query:{
          name:'wanggang',
          age:18
        }
      });
    };
    const {t} = useI18n();
    const handleFinishFailed = (errors: ValidateErrorEntity<FormState>) => { return 1;};
    return {
      formState,
      handleFinish,
      handleFinishFailed,
      t,
    };
  },
  components: {
    UserOutlined,
    LockOutlined,
  },
});