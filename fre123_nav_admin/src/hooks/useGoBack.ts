import { useRouter } from 'vue-router'
export default function useGoBack(name?: string) {
  const router = useRouter()
  const goBack = () => {
    name ? router.push({ name }) : router.back()
  }
  return { goBack }
}
