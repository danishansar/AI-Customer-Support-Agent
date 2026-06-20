import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from '../config'
import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line
} from 'recharts'

function Analytics() {

    const [stats, setStats] = useState({

        totalBots: 0,
        totalConversations: 0,
        totalCustomers: 0,
        recentChats: []

    })

    const [loading, setLoading] = useState(true)

    // FETCH DATA
    const fetchAnalytics = async () => {

        try {

            const token = localStorage.getItem('token')

            const response = await axios.get(
                 `${API_URL}api/dashboard`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setStats(response.data)

            setLoading(false)

        } catch (error) {

            console.log(error)

            setLoading(false)

        }

    }

    useEffect(() => {

        fetchAnalytics()

    }, [])

    // CHART DATA
    const statsData = [

        {
            name: 'Bots',
            value: stats.totalBots
        },

        {
            name: 'Chats',
            value: stats.totalConversations
        },

        {
            name: 'Customers',
            value: stats.totalCustomers
        }

    ]

    const COLORS = [
        '#7c3aed',
        '#2563eb',
        '#ec4899'
    ]

    const activityData = stats.recentChats?.slice(0, 7).map((chat, index) => ({

        day: `Chat ${index + 1}`,
        messages: 1

    }))

    if (loading) {

        return (

            <div className="text-white text-3xl font-bold">
                Loading Analytics...
            </div>

        )

    }

    return (

        <div className="w-full text-white">

            {/* HEADER */}
            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-5xl font-black">
                        Analytics 📊
                    </h1>

                    <p className="text-gray-400 mt-3 text-lg">
                        Track your AI customer support performance
                    </p>

                </div>

                <div className="bg-green-500/20 border border-green-500 text-green-400 px-5 py-3 rounded-2xl">
                    Live Analytics
                </div>

            </div>

            {/* TOP CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">

                {/* TOTAL CHATS */}
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-8 rounded-[32px] shadow-2xl">

                    <p className="text-lg text-white/80">
                        Total Chats
                    </p>

                    <h1 className="text-6xl font-black mt-4">
                        {stats.totalConversations}
                    </h1>

                </div>

                {/* TOTAL BOTS */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-8 rounded-[32px] shadow-2xl">

                    <p className="text-lg text-white/80">
                        Active Bots
                    </p>

                    <h1 className="text-6xl font-black mt-4">
                        {stats.totalBots}
                    </h1>

                </div>

                {/* CUSTOMERS */}
                <div className="bg-gradient-to-r from-pink-600 to-violet-600 p-8 rounded-[32px] shadow-2xl">

                    <p className="text-lg text-white/80">
                        Customers
                    </p>

                    <h1 className="text-6xl font-black mt-4">
                        {stats.totalCustomers}
                    </h1>

                </div>

            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">

                {/* BAR CHART */}
                <div className="bg-[#0f172a] border border-white/10 rounded-[32px] p-8">

                    <h2 className="text-2xl font-black mb-8">
                        Platform Overview 🚀
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>

                        <BarChart data={statsData}>

                            <XAxis dataKey="name" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="value"
                                radius={[12, 12, 0, 0]}
                            >

                                {
                                    statsData.map((entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />

                                    ))
                                }

                            </Bar>

                        </BarChart>

                    </ResponsiveContainer>

                </div>

                {/* PIE CHART */}
                <div className="bg-[#0f172a] border border-white/10 rounded-[32px] p-8">

                    <h2 className="text-2xl font-black mb-8">
                        Business Distribution 🤖
                    </h2>

                    <ResponsiveContainer width="100%" height={300}>

                        <PieChart>

                            <Pie
                                data={statsData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={110}
                                label
                            >

                                {
                                    statsData.map((entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={COLORS[index % COLORS.length]}
                                        />

                                    ))
                                }

                            </Pie>

                            <Tooltip />

                        </PieChart>

                    </ResponsiveContainer>

                </div>

            </div>

            {/* LINE CHART */}
            <div className="bg-[#0f172a] border border-white/10 rounded-[32px] p-8 mt-10">

                <h2 className="text-2xl font-black mb-8">
                    Recent Chat Activity 📈
                </h2>

                <ResponsiveContainer width="100%" height={320}>

                    <LineChart data={activityData}>

                        <XAxis dataKey="day" />

                        <YAxis />

                        <Tooltip />

                        <Line
                            type="monotone"
                            dataKey="messages"
                            stroke="#7c3aed"
                            strokeWidth={4}
                        />

                    </LineChart>

                </ResponsiveContainer>

            </div>

            {/* RECENT ACTIVITY */}
            <div className="mt-12">

                <h2 className="text-3xl font-black mb-8">
                    Recent Customer Activity 💬
                </h2>

                <div className="space-y-5">

                    {
                        stats.recentChats?.length > 0 ? (

                            stats.recentChats.map((chat) => (

                                <div
                                    key={chat._id}
                                    className="bg-gradient-to-br from-[#0f172a] to-[#111827] border border-white/10 rounded-3xl p-6"
                                >

                                    <div>

                                        <p className="text-violet-400 text-sm font-semibold uppercase">
                                            Customer Message
                                        </p>

                                        <p className="text-lg mt-3">
                                            {chat.customerMessage}
                                        </p>

                                    </div>

                                    <div className="mt-8">

                                        <p className="text-green-400 text-sm font-semibold uppercase">
                                            AI Response
                                        </p>

                                        <p className="text-gray-300 mt-3 leading-8">
                                            {chat.aiReply}
                                        </p>

                                    </div>

                                    <div className="mt-6 text-gray-500 text-sm">

                                        {
                                            new Date(chat.createdAt)
                                                .toLocaleString()
                                        }

                                    </div>

                                </div>

                            ))

                        ) : (

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-10 text-center">

                                <h2 className="text-2xl font-bold">
                                    No Activity Yet
                                </h2>

                            </div>

                        )
                    }

                </div>

            </div>

        </div>

    )

}

export default Analytics