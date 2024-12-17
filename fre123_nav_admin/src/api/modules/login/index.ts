import request from '@/api'
import { ILoginParams } from './interface'
import { USER_LOGIN } from './urls.const'
const loginApi = {
  getLoginList: (params: ILoginParams) => request.post(USER_LOGIN, params),
}

export default loginApi
