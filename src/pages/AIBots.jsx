import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

function AIBots() {

    const [bots, setBots] = useState([])

    const [formData, setFormData] = useState({
        botName: '',
        businessType: '',
        welcomeMessage: '',
        aiPrompt: ''
    })

    // INPUT CHANGE
    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })

    }

    // CREATE BOT
    const createBot = async (e) => {

        e.preventDefault()

        try {

            const token = localStorage.getItem('token')

            await axios.post(
                 `${API_URL}api/chatbots`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert('AI Bot Created 🚀')

            // RESET FORM
            setFormData({
                botName: '',
                businessType: '',
                welcomeMessage: '',
                aiPrompt: ''
            })

            fetchBots()

        } catch (error) {

            console.log(error)

        }

    }

    // FETCH BOTS
    const fetchBots = async () => {

        try {

            const token = localStorage.getItem('token')

            const response = await axios.get(
                 `${API_URL}api/chatbots`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setBots(response.data)

        } catch (error) {

            console.log(error)

        }

    }

    // DELETE BOT
    const deleteBot = async (id) => {

        try {

            const token = localStorage.getItem('token')

            await axios.delete(
                `${API_URL}api/chatbots/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert('Bot Deleted')

            fetchBots()

        } catch (error) {

            console.log(error)

        }

    }

    useEffect(() => {

        fetchBots()

    }, [])

    return (

        <div className="text-white">

            {/* PAGE TITLE */}
            <div className="flex items-center justify-between">

                <div>

                    <h1 className="text-5xl font-black">
                        AI Bots 🤖
                    </h1>

                    <p className="text-gray-400 mt-3">
                        Create and manage your AI customer support bots
                    </p>

                </div>

            </div>

            {/* FORM */}
            <form
                onSubmit={createBot}
                className="bg-white/5 border border-white/10 rounded-[32px] p-8 mt-10 backdrop-blur-xl"
            >

                <div className="grid grid-cols-2 gap-5">

                    {/* BOT NAME */}
                    <input
                        type="text"
                        name="botName"
                        value={formData.botName}
                        placeholder="Bot Name"
                        onChange={handleChange}
                        className="p-4 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-violet-500"
                    />

                    {/* BUSINESS TYPE */}
                    <select
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="p-4 rounded-2xl bg-black/20 border border-white/10 outline-none focus:border-violet-500"
                    >

                        <option value="">
                            Select Business
                        </option>

                        <option value="gym">
                            Gym
                        </option>

                        <option value="dental clinic">
                            Dental Clinic
                        </option>

                        <option value="e-commerce">
                            E-commerce
                        </option>

                        <option value="law firm">
                            Law Firm
                        </option>

                    </select>

                </div>

                {/* WELCOME MESSAGE */}
                <textarea
                    name="welcomeMessage"
                    value={formData.welcomeMessage}
                    placeholder="Welcome Message"
                    onChange={handleChange}
                    className="w-full mt-5 p-4 rounded-2xl bg-black/20 border border-white/10 outline-none h-[120px] focus:border-violet-500"
                />

                {/* AI PROMPT */}
                <textarea
                    name="aiPrompt"
                    value={formData.aiPrompt}
                    placeholder="AI Instructions..."
                    onChange={handleChange}
                    className="w-full mt-5 p-4 rounded-2xl bg-black/20 border border-white/10 outline-none h-[180px] focus:border-violet-500"
                />

                {/* BUTTON */}
                <button
                    className="mt-6 bg-violet-600 hover:bg-violet-700 transition-all px-8 py-4 rounded-2xl font-bold"
                >
                    Create AI Bot 🚀
                </button>

            </form>

            {/* BOT LIST */}
            <div className="grid grid-cols-3 gap-6 mt-10">

                {
                    bots.map((bot) => (

                        <div
                            key={bot._id}
                            className="bg-white/5 border border-white/10 rounded-[32px] p-6 hover:border-violet-500 transition-all backdrop-blur-xl"
                        >

                            {/* TOP */}
                            <div className="flex items-center justify-between">

                                <div>

                                    <h2 className="text-3xl font-bold">
                                        {bot.botName}
                                    </h2>

                                    <p className="text-violet-400 mt-2 capitalize">
                                        {bot.businessType}
                                    </p>

                                </div>

                                <div className="w-14 h-14 rounded-2xl bg-violet-600 flex items-center justify-center text-2xl">
                                    🤖
                                </div>

                            </div>

                            {/* MESSAGE */}
                            <p className="text-gray-400 mt-6 leading-7">
                                {bot.welcomeMessage}
                            </p>

                            {/* BUTTONS */}
                            <div className="flex flex-wrap gap-3 mt-8">

                                {/* OPEN CHAT */}
                                <a
                                    href={`https://danishansaree.co.in/chat/${bot._id}`}
                                    target="_blank"
                                    className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-xl font-semibold transition-all"
                                >
                                    Open Chat
                                </a>

                                {/* COPY LINK */}
                                <button

                                    onClick={() => {

                                        navigator.clipboard.writeText(
                                            `https://danishansaree.co.in/chat/${bot._id}`
                                        )

                                        alert('Chat Link Copied 🚀')

                                    }}

                                    className="bg-violet-600 hover:bg-violet-700 px-4 py-3 rounded-xl font-semibold transition-all"
                                >

                                    Copy Link

                                </button>

                                {/* DELETE */}
                                <button
                                    onClick={() => deleteBot(bot._id)}
                                    className="bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl font-semibold transition-all"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    ))
                }

            </div>

        </div>

    )

}

export default AIBots