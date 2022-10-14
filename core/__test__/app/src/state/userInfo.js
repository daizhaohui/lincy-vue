import {Module,Observable,Persist,Action} from '../../../../src/state';
@Module("user")
export default class UserInfo{

  @Persist()
  @Observable({})
  static userInfo;

  @Observable([])
  static scores;

  @Action()
  static updateUserInfo(data){}
}
