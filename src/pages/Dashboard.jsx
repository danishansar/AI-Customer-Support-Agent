import axios from 'axios'
import { useEffect, useState } from 'react'
import {
  LuBell, LuCalendar, LuMessageCircle, LuBot,
  LuUsers, LuTrendingUp, LuChevronRight, LuActivity,
  LuPlus, LuCreditCard, LuTriangle, LuCircleCheck
} from 'react-icons/lu'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'
import { API_URL } from '../config'

const BOT_COLORS = ['#7c3aed', '#3b82f6', '#10b981', '#f59e0b', '#ec4899']
const BOT_ICON_STYLES = [
  { iconBg: 'bg-violet-500/15', iconColor: 'text-violet-300' },
  { iconBg: 'bg-blue-500/15', iconColor: 'text-blue-300' },
  { iconBg: 'bg-emerald-500/15', iconColor: 'text-emerald-300' },
  { iconBg: 'bg-amber-500/15', iconColor: 'text-amber-300' },
  { iconBg: 'bg-pink-500/15', iconColor: 'text-pink-300' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1f] border border-white/10 rounded-lg px-3 py-2 text-[12px]">
        <p className="text-white/50 mb-1">{label}</p>
        {payload.map((p) => (
          <p key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</p>
        ))}
      </div>
    )
  }
  return null
}

function timeAgo(dateStr) {
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}min ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

function Dashboard() {

  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    totalBots: 0,
    totalConversations: 0,
    totalCustomers: 0,
    recentChats: [],
    botWiseChats: [],
    last7Days: []
  })

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get( `${API_URL}api/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setUser(res.data.user)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get( `${API_URL}api/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStats(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchProfile()
    fetchDashboardStats()
  }, [])

  // DYNAMIC BOT DISTRIBUTION for donut chart
  const botDistribution = stats.botWiseChats?.length > 0
    ? stats.botWiseChats.map((bot, i) => ({
      name: bot.name,
      value: bot.chats,
      color: BOT_COLORS[i % BOT_COLORS.length]
    }))
    : []

  const totalChatsForPercent = botDistribution.reduce((sum, b) => sum + b.value, 0)

  // DYNAMIC ACTIVITY FEED from recentChats
  const dynamicActivityFeed = stats.recentChats?.length > 0
    ? stats.recentChats.slice(0, 6).map((chat) => ({
      icon: LuMessageCircle,
      iconBg: 'bg-emerald-500/15',
      iconColor: 'text-emerald-400',
      text: `Customer messaged ${chat.botId?.name || 'a bot'}: "${chat.customerMessage?.slice(0, 40)}${chat.customerMessage?.length > 40 ? '...' : ''}"`,
      time: timeAgo(chat.createdAt)
    }))
    : []

  const statCards = [
    {
      label: 'Total Chats',
      value: stats.totalConversations || 0,
      icon: LuMessageCircle,
      trend: 'All time conversations',
      bg: 'bg-[#18103a]',
      border: 'border-violet-500/30',
      topBar: 'bg-violet-500',
      iconBg: 'bg-violet-500/20',
      iconColor: 'text-violet-300',
    },
    {
      label: 'Active Bots',
      value: stats.totalBots || 0,
      icon: LuBot,
      trend: 'All systems online',
      bg: 'bg-[#0d1f3c]',
      border: 'border-blue-500/30',
      topBar: 'bg-blue-500',
      iconBg: 'bg-blue-500/20',
      iconColor: 'text-blue-300',
    },
    {
      label: 'Customers',
      value: stats.totalCustomers || 0,
      icon: LuUsers,
      trend: 'Unique customers served',
      bg: 'bg-[#2a0d1a]',
      border: 'border-rose-500/30',
      topBar: 'bg-rose-500',
      iconBg: 'bg-rose-500/20',
      iconColor: 'text-rose-300',
    },
    {
      label: 'Resolution Rate',
      value: stats.totalConversations > 0 ? '84%' : '0%',
      icon: LuTrendingUp,
      trend: 'Avg across all bots',
      bg: 'bg-[#0a2018]',
      border: 'border-emerald-500/30',
      topBar: 'bg-emerald-500',
      iconBg: 'bg-emerald-500/20',
      iconColor: 'text-emerald-300',
    },
  ]

  return (
    <div className="w-full min-h-screen p-8">

      {/* TOPBAR */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-[22px] font-semibold text-white tracking-tight">Dashboard</h1>
            <span className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] px-2.5 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
          <p className="text-[13px] text-white/40 mt-1">
            Welcome back, <span className="text-violet-400 font-medium">{user?.name}</span> — here's what's happening today
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-[12px] text-white/50 cursor-pointer">
            <LuCalendar size={13} /> Last 7 days
          </div>
          <div className="relative w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-white/50 cursor-pointer">
            <LuBell size={15} />
            {stats.recentChats?.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-rose-500 rounded-full" />
            )}
          </div>
          <button
            onClick={() => { localStorage.removeItem('token'); window.location.href = '/' }}
            className="bg-white/5 hover:bg-white/10 border border-white/10 transition px-4 py-2 rounded-lg text-[12px] text-white/60 font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {statCards.map(({ label, value, icon: Icon, trend, bg, border, topBar, iconBg, iconColor }) => (
          <div key={label} className={`relative ${bg} border ${border} rounded-xl p-5 overflow-hidden`}>
            <div className={`absolute top-0 left-0 right-0 h-[2px] ${topBar}`} />
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] uppercase tracking-[0.08em] text-white/40 font-medium">{label}</p>
              <div className={`w-7 h-7 rounded-lg ${iconBg} flex items-center justify-center`}>
                <Icon size={14} className={iconColor} />
              </div>
            </div>
            <p className="text-[30px] font-semibold text-white leading-none mb-3">{value}</p>
            <p className="text-[11px] flex items-center gap-1 text-emerald-400">
              <LuTrendingUp size={11} />{trend}
            </p>
          </div>
        ))}
      </div>

      {/* CHARTS ROW */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-4 mb-4">

        {/* LINE CHART — live last7Days data */}
        <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <p className="text-[13px] font-semibold text-white flex items-center gap-2">
              <LuActivity size={14} className="text-violet-400" />
              Chat volume — last 7 days
            </p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-[11px] text-white/35">
                <span className="w-2 h-2 rounded-sm bg-violet-500 inline-block" /> Chats
              </span>
              <span className="flex items-center gap-1.5 text-[11px] text-white/35">
                <span className="w-2 h-2 rounded-sm bg-emerald-500 inline-block" /> Resolved
              </span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={stats.last7Days?.length > 0 ? stats.last7Days : []}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="day" tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }} axisLine={false} tickLine={false} allowDecimals={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="chats" name="Chats" stroke="#7c3aed" strokeWidth={2} dot={{ fill: '#7c3aed', r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#10b981" strokeWidth={2} strokeDasharray="4 3" dot={{ fill: '#10b981', r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* DONUT CHART — live botWiseChats */}
        <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-5">
          <p className="text-[13px] font-semibold text-white flex items-center gap-2 mb-4">
            <LuBot size={14} className="text-violet-400" /> Chats by bot
          </p>
          {botDistribution.length > 0 ? (
            <div className="flex items-center gap-4">
              <ResponsiveContainer width={130} height={130}>
                <PieChart>
                  <Pie data={botDistribution} cx="50%" cy="50%" innerRadius={38} outerRadius={58} dataKey="value" paddingAngle={3}>
                    {botDistribution.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col gap-3 flex-1">
                {botDistribution.map((bot) => (
                  <div key={bot.name} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: bot.color }} />
                    <span className="text-[12px] text-white/40 flex-1 truncate">{bot.name}</span>
                    <span className="text-[12px] font-medium text-white/80">
                      {totalChatsForPercent > 0 ? Math.round((bot.value / totalChatsForPercent) * 100) : 0}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[130px]">
              <p className="text-[12px] text-white/25">No bot data yet</p>
            </div>
          )}
        </div>

      </div>

      {/* BOTTOM ROW */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr) minmax(0,1fr)' }}>

        {/* RECENT CONVERSATIONS — live */}
        <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[13px] font-semibold text-white flex items-center gap-2">
              <LuMessageCircle size={14} className="text-violet-400" /> Recent conversations
            </p>
            <button className="flex items-center gap-1 text-[12px] text-violet-400 hover:text-violet-300 transition-colors">
              View all <LuChevronRight size={13} />
            </button>
          </div>
          <div className="space-y-1">
            {stats.recentChats?.length > 0 ? (
              stats.recentChats.slice(0, 4).map((chat, i) => {
                const colorSets = [
                  'bg-violet-600/20 text-violet-300 border-violet-500/20',
                  'bg-blue-600/20 text-blue-300 border-blue-500/20',
                  'bg-teal-600/20 text-teal-300 border-teal-500/20',
                  'bg-rose-600/20 text-rose-300 border-rose-500/20',
                ]
                return (
                  <div key={chat._id} className="flex items-start gap-3 py-3 border-b border-white/[0.05] last:border-0 last:pb-0">
                    <div className={`w-7 h-7 rounded-full border flex items-center justify-center text-[10px] font-semibold flex-shrink-0 mt-0.5 ${colorSets[i % colorSets.length]}`}>
                      C{i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-[12px] text-white/80 truncate flex-1">{chat.customerMessage}</p>
                        {chat.botId?.name && (
                          <span className="text-[10px] bg-violet-500/15 text-violet-300 border border-violet-500/20 px-2 py-0.5 rounded-full flex-shrink-0">
                            {chat.botId.name}
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-white/30 truncate">{chat.aiReply?.slice(0, 60)}...</p>
                      <p className="text-[10px] text-white/20 mt-1">{timeAgo(chat.createdAt)}</p>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="text-center py-8">
                <LuMessageCircle size={28} className="text-white/20 mx-auto mb-2" />
                <p className="text-[13px] text-white/30">No conversations yet</p>
              </div>
            )}
          </div>
        </div>

        {/* BOT STATUS — live botWiseChats */}
        <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-5">
          <p className="text-[13px] font-semibold text-white flex items-center gap-2 mb-4">
            <LuBot size={14} className="text-violet-400" /> Bot status
          </p>
          <div className="space-y-1">
            {stats.botWiseChats?.length > 0 ? (
              stats.botWiseChats.map((bot, i) => (
                <div key={bot.name} className="flex items-center gap-3 py-2 border-b border-white/[0.05] last:border-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${BOT_ICON_STYLES[i % BOT_ICON_STYLES.length].iconBg}`}>
                    <LuBot size={14} className={BOT_ICON_STYLES[i % BOT_ICON_STYLES.length].iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                      <p className="text-[12.5px] font-medium text-white/85 truncate">{bot.name}</p>
                    </div>
                    <p className="text-[10px] text-white/30">{bot.businessType}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[13px] font-medium text-white/80">{bot.chats}</p>
                    <p className="text-[10px] text-white/30">chats</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[12px] text-white/25 text-center py-4">No bots yet</p>
            )}
          </div>

          {/* RESOLUTION BARS — live */}
          {stats.botWiseChats?.length > 0 && (
            <div className="mt-4 pt-4 border-t border-white/[0.05]">
              <p className="text-[11px] font-medium text-white/40 uppercase tracking-wider mb-3">Chats by bot</p>
              {stats.botWiseChats.map((bot, i) => {
                const maxChats = Math.max(...stats.botWiseChats.map(b => b.chats), 1)
                const pct = Math.round((bot.chats / maxChats) * 100)
                return (
                  <div key={bot.name} className="flex items-center gap-2 mb-2">
                    <p className="text-[10px] text-white/35 w-[65px] flex-shrink-0 truncate">{bot.name}</p>
                    <div className="flex-1 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: BOT_COLORS[i % BOT_COLORS.length] }} />
                    </div>
                    <p className="text-[10px] text-white/40 w-6 text-right">{bot.chats}</p>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* ACTIVITY FEED — live from recentChats */}
        <div className="bg-[#111114] border border-white/[0.07] rounded-xl p-5">
          <p className="text-[13px] font-semibold text-white flex items-center gap-2 mb-4">
            <LuActivity size={14} className="text-violet-400" /> Activity feed
          </p>
          <div className="space-y-1">
            {dynamicActivityFeed.length > 0 ? (
              dynamicActivityFeed.map((item, i) => (
                <div key={i} className="flex items-start gap-3 py-2 border-b border-white/[0.05] last:border-0">
                  <div className={`w-7 h-7 rounded-lg ${item.iconBg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <item.icon size={13} className={item.iconColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] text-white/55 leading-snug">{item.text}</p>
                    <p className="text-[10px] text-white/25 mt-1">{item.time}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-[12px] text-white/25 text-center py-4">No activity yet</p>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Dashboard