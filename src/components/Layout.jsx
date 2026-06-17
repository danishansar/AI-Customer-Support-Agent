import { Link, Outlet } from 'react-router-dom'

function Layout() {

    return (
        <div className="min-h-screen bg-black text-white flex">
            <div className="w-[280px] bg-white/5 border-r border-white/10 p-8">

                <h1 className="text-4xl font-black bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    AI Support
                </h1>

                <div className="mt-16 space-y-5">

                    <Link
                        to="/dashboard"
                        className="block w-full bg-violet-600 p-4 rounded-2xl text-left font-bold"
                    >
                        Dashboard
                    </Link>

                    <Link
                        to="/ai-bots"
                        className="block w-full bg-white/5 p-4 rounded-2xl text-left"
                    >
                        AI Bots
                    </Link>

                    <Link to="/conversations"
                        className="block w-full bg-white/5 p-4 rounded-2xl text-left"
                    >
                        Conversations
                    </Link>

                    <Link
                        to="/analytics"
                        className="block w-full bg-white/5 p-4 rounded-2xl text-left"
                    >
                        Analytics
                    </Link>

                    <Link
                        to="/settings"
                        className="block w-full bg-white/5 p-4 rounded-2xl text-left"
                    >
                        Settings
                    </Link>

                </div>

            </div>
            <div className="flex-1 p-10">

                <Outlet />

            </div>

        </div>

    )

}

export default Layout