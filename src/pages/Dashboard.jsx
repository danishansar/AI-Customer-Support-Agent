import axios from 'axios'
import { useEffect, useState } from 'react'

function Dashboard() {

  const [user, setUser] = useState(null)

  const [stats, setStats] = useState({

    totalBots: 0,
    totalConversations: 0,
    totalCustomers: 0,
    recentChats: []

  })

  // FETCH PROFILE
  const fetchProfile = async () => {

    try {

      const token = localStorage.getItem('token')

      const response = await axios.get(
        'http://localhost:5000/api/auth/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setUser(response.data.user)

    } catch (error) {

      console.log(error)

    }

  }

  // FETCH DASHBOARD STATS
  const fetchDashboardStats = async () => {

    try {

      const token = localStorage.getItem('token')

      const response = await axios.get(
        'http://localhost:5000/api/dashboard',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setStats(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  useEffect(() => {

    fetchProfile()

    fetchDashboardStats()

  }, [])

  return (

    <div className="w-full">

      {/* TOP */}
      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-5xl font-black">
            Dashboard 🚀
          </h1>

          <p className="text-gray-400 mt-3 text-xl">

            Welcome back

            {' '}

            <span className="text-violet-400 font-bold">
              {user?.name}
            </span>

            👋

          </p>

        </div>

        <button
          onClick={() => {

            localStorage.removeItem('token')

            window.location.href = '/'

          }}
          className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-2xl font-semibold"
        >
          Logout
        </button>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

        {/* TOTAL CHATS */}
        <div className="bg-gradient-to-r from-violet-600 to-indigo-600 rounded-[32px] p-8 shadow-2xl">

          <p className="text-lg text-white/80">
            Total Chats
          </p>

          <h1 className="text-6xl font-black mt-4">

            {stats.totalConversations || 0}

          </h1>

        </div>

        {/* ACTIVE BOTS */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-[32px] p-8 shadow-2xl">

          <p className="text-lg text-white/80">
            Active Bots
          </p>

          <h1 className="text-6xl font-black mt-4">

            {stats.totalBots || 0}

          </h1>

        </div>

        {/* CUSTOMERS */}
        <div className="bg-gradient-to-r from-pink-600 to-violet-600 rounded-[32px] p-8 shadow-2xl">

          <p className="text-lg text-white/80">
            Customers
          </p>

          <h1 className="text-6xl font-black mt-4">

            {stats.totalCustomers || 0}

          </h1>

        </div>

      </div>

      {/* RECENT CONVERSATIONS */}
      <div className="mt-14">

        <div className="flex items-center justify-between mb-8">

          <h2 className="text-3xl font-black">
            Recent Conversations 💬
          </h2>

          <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm text-gray-300">
            Live Data
          </div>

        </div>

        <div className="space-y-5">

          {
            stats.recentChats?.length > 0 ? (

              stats.recentChats.map((chat) => (

                <div
                  key={chat._id}
                  className="bg-gradient-to-br from-[#0f172a] to-[#111827] border border-white/10 rounded-3xl p-6 hover:border-violet-500/40 transition-all duration-300 shadow-xl"
                >

                  {/* CUSTOMER */}
                  <div>

                    <p className="text-violet-400 font-semibold text-sm uppercase tracking-wider">
                      Customer
                    </p>

                    <p className="mt-3 text-lg leading-8 text-white">
                      {chat.customerMessage}
                    </p>

                  </div>

                  {/* AI REPLY */}
                  <div className="mt-8">

                    <p className="text-green-400 font-semibold text-sm uppercase tracking-wider">
                      AI Reply
                    </p>

                    <p className="mt-3 text-gray-300 leading-8">
                      {chat.aiReply}
                    </p>

                  </div>

                  {/* DATE */}
                  <div className="mt-6 text-sm text-gray-500">

                    {
                      new Date(chat.createdAt)
                        .toLocaleString()
                    }

                  </div>

                </div>

              ))

            ) : (

              <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">

                <h2 className="text-2xl font-bold text-gray-300">
                  No Conversations Yet
                </h2>

                <p className="text-gray-500 mt-3">
                  Your customer chats will appear here.
                </p>

              </div>

            )
          }

        </div>

      </div>

    </div>

  )

}

export default Dashboard