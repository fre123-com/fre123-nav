import { errorMessage, successMessage } from '@/utils/notifications'
export const handleResponse = (
  response: any,
  onSuccess: { (newAdData: any): boolean; (arg0: any): any }
) => {
  if (response.success) {
    const { data } = response
    if (!data) {
      errorMessage('提交成功，但未返回有效数据')
      return false
    }
    // 执行成功的回调函数，传入data和其他需要的参数
    return onSuccess(data)
  } else {
    errorMessage(response.message || '提交失败')
    return false
  }
}
