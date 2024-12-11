import { defineStore,storeToRefs } from 'pinia'
import { useQuery } from 'vue-query'
import { FRIENDSHIP_USER_STORE } from '@/utils/constant'
import { reactive } from 'vue'
import { USER_FRIEND_SHIP } from '@/api/modules/friendship_link/urls.const'
import friendShipApi from '@/api/modules/friendship_link'

export const UserFriendShipStore = defineStore(FRIENDSHIP_USER_STORE, () => {
  const IFriendShipParams = reactive({
  name:'',
  })
  const {
    refetch: refetchUserList,
    isFetching: isUserLoading,
    data: userListData,
  } = useQuery(USER_FRIEND_SHIP, () => friendShipApi.getFriendShipList(IFriendShipParams), {
    enabled: true
  })
  return {
    IFriendShipParams,
    refetchUserList,
    isUserLoading,
    userListData
  }
})
export const useUserFriendShipStore = () => storeToRefs(UserFriendShipStore())