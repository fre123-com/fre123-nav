import { USER_FRIEND_SHIP, USER_FRIEND_SHIP_DELETE, USER_FRIEND_SHIP_UPDATE, USER_FRIEND_SHIP_INSERT, USER_FRIEND_SHIP_TYPE_SORT } from './urls.const'
import { IFriendShipParams, IFriendShipItem, IFriendShipInsertParams, IFriendShipDeleteParams, IFriendShipItemData, IFriendShipTypeSortParams } from './interface'

import request from '@/api'

const friendShipApi = {
  getFriendShipList: (params: IFriendShipParams) => request.post<IFriendShipItem>(USER_FRIEND_SHIP, params),
  delUser: (params: IFriendShipDeleteParams) => request.post(USER_FRIEND_SHIP_DELETE, params),
  insertUser: (params: IFriendShipInsertParams) => request.post(USER_FRIEND_SHIP_INSERT, params),
  updateUser: (params:IFriendShipItemData) =>request.post(USER_FRIEND_SHIP_UPDATE,params),
  sortTypeUser: (params:IFriendShipTypeSortParams) =>request.post(USER_FRIEND_SHIP_TYPE_SORT,params)
}
export default friendShipApi