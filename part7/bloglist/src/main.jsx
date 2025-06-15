import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationProvider } from './context/NotificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserProvider } from './context/UserContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider
  >
    <NotificationProvider>
      <QueryClientProvider client={ queryClient }>
        <App />
      </QueryClientProvider>
    </NotificationProvider>
  </UserProvider>

)