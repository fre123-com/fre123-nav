/**
 * 描述滚动到通用容器顶部视图
 */
export const scrollTablesTop = () => {
  setTimeout(() => {
    const target = document.querySelector('.common-wrapper')
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
      })
    }
  }, 100)
}
