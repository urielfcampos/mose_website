import { Toast } from 'buefy/dist/components/toast'
export default function({ store, error, redirect, route }) {
  if (process.browser) {
    if (!store.state.auth.user) {
      Toast.open('Usuario nao autorizado')
      redirect('/login')
    }
  }
}
