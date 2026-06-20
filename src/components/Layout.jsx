import { Link, Outlet, useLocation } from 'react-router-dom'
import { 
  LuLayoutDashboard, LuBot, LuMessageCircle, 
  LuChartBar, LuSettings, LuBrain, LuChevronDown
} from 'react-icons/lu';

const navMain = [
  { label: 'Dashboard', icon: LuLayoutDashboard, path: '/dashboard' },
  { label: 'AI Bots', icon: LuBot, path: '/ai-bots', dot: true },
  { label: 'Conversations', icon: LuMessageCircle, path: '/conversations' },
];

const navInsights = [
  { label: 'Analytics', icon: LuChartBar, path: '/analytics' },
];

const navAccount = [
  { label: 'Settings', icon: LuSettings, path: '/settings' },
];

function NavSection({ label, items }) {
  const location = useLocation();
  return (
    <div className="mb-5">
      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/30 px-3 py-2">
        {label}
      </p>
      {items.map(({ label, icon: Icon, path, dot }) => {
        const active = location.pathname === path;
        return (
          <Link
            key={path}
            to={path}
            className={`flex items-center gap-3 px-3 py-[9px] rounded-lg mb-0.5 transition-all duration-150
              ${active
                ? 'bg-violet-600/20 text-violet-300 border-r-2 border-violet-500 font-medium text-[12.5px]'
                : 'text-white/40 hover:bg-white/5 hover:text-white/70 font-normal text-[12.5px]'}`}
          >
            <Icon size={15} />
            <span className="flex-1 tracking-wide">{label}</span>
            {dot && !active && (
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
            )}
          </Link>
        );
      })}
    </div>
  );
}

function Layout() {
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex">

      {/* Sidebar */}
      <div className="w-[210px] min-h-screen bg-[#09090b] border-r border-white/[0.06] flex flex-col flex-shrink-0">

        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-[18px] border-b border-white/[0.05]">
          <div className="w-[28px] h-[28px] bg-violet-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <LuBrain size={15} color="white" />
          </div>
          <span className="text-[14.5px] font-semibold text-white tracking-tight">
            AI Support
          </span>
          <span className="ml-auto text-[10px] font-semibold tracking-wide bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-md">
            Pro
          </span>
        </div>

        {/* Nav */}
        <div className="flex-1 px-2 pt-4">
          <NavSection label="Main" items={navMain} />
          <NavSection label="Insights" items={navInsights} />
          <NavSection label="Account" items={navAccount} />
        </div>

        {/* User Footer */}
        <div className="border-t border-white/[0.05] p-2">
          <div className="flex items-center gap-2.5 px-2 py-2.5 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
            <div className="w-[28px] h-[28px] rounded-full bg-violet-600 flex items-center justify-center text-[11px] font-semibold text-white flex-shrink-0">
              DA
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12.5px] font-medium text-white/90 truncate tracking-tight">
                Danish Ansari
              </p>
              <p className="text-[10px] text-white/30 tracking-wide">
                Pro Plan · Active
              </p>
            </div>
            <LuChevronDown size={13} className="text-white/25 flex-shrink-0" />
          </div>
        </div>

      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#09090b] overflow-auto">
        <Outlet />
      </div>

    </div>
  );
}

export default Layout