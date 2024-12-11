import request from '@/api'
import { CONFIG_ADMIN_GET } from './urls.const'
const importApi = {
  getConfigData: () => request.post(CONFIG_ADMIN_GET),
}
export default importApi
