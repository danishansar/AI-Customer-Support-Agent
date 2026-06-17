import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AIBots from './pages/AIBots'
import CustomerChat from './pages/CustomerChat'
import Conversations from './pages/conversations'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        {/* CUSTOMER CHAT */}
        <Route
          path="/chat/:botId"
          element={<CustomerChat />}
        />

        {/* PROTECTED LAYOUT */}
        <Route
          element={
            <ProtectedRoute>

              <Layout />

            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/ai-bots"
            element={<AIBots />}
          />
          <Route
            path="/conversations"
            element={<Conversations />}
          />
          <Route
            path="/analytics"
            element={<Analytics />}
          />
          <Route
            path="/settings"
            element={<Settings />}
          />
        </Route>

      </Routes>

    </BrowserRouter>

  )

}

export default App