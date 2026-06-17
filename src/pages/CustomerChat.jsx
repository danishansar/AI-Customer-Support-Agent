import {
    useState,
    useEffect,
    useRef
} from 'react'

import axios from 'axios'

import {
    useParams
} from 'react-router-dom'

function CustomerChat() {

    const { botId } = useParams()

    const [bot, setBot] = useState(null)

    const [message, setMessage] = useState('')

    const [messages, setMessages] = useState([])

    const [loading, setLoading] = useState(false)

    const bottomRef = useRef()

    // AUTO SCROLL
    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: 'smooth'
        })

    }, [messages, loading])

    // FETCH BOT
    useEffect(() => {

        fetchBot()

    }, [])

    const fetchBot = async () => {

        try {

            const response = await axios.get(
                `http://localhost:5000/api/chatbots/${botId}`
            )

            setBot(response.data)

            // WELCOME MESSAGE
            setMessages([
                {
                    sender: 'ai',
                    text: response.data.welcomeMessage
                }
            ])

        } catch (error) {

            console.log(error)

        }

    }

    // SEND MESSAGE
    const sendMessage = async () => {

        if (!message) return

        const userText = message

        setMessage('')

        const userMessage = {
            sender: 'user',
            text: userText
        }

        setMessages(prev => [
            ...prev,
            userMessage
        ])

        setLoading(true)

        try {

            const response = await axios.post(
                'http://localhost:5000/api/chat',
                {
                    message: userText,
                    botId
                }
            )

            const aiMessage = {
                sender: 'ai',
                text: response.data.reply
            }

            setMessages(prev => [
                ...prev,
                aiMessage
            ])

        } catch (error) {

            console.log(error)

        }

        setLoading(false)

    }

    return (

        <div className="min-h-screen bg-black text-white flex flex-col overflow-hidden">

            {/* BG */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-700 blur-[180px] opacity-20 rounded-full"></div>

            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-700 blur-[180px] opacity-20 rounded-full"></div>

            {/* HEADER */}
            <div className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-xl">

                <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-black flex items-center gap-3">

                            🤖 {bot?.botName || 'AI Support'}

                        </h1>

                        <p className="text-gray-400 mt-1">

                            {bot?.businessType} AI Assistant

                        </p>

                    </div>

                    <div className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full border border-green-500/20 text-sm">

                        ● AI Online

                    </div>

                </div>

            </div>

            {/* CHAT */}
            <div className="relative z-10 flex-1 overflow-y-auto px-6 py-10">

                <div className="max-w-5xl mx-auto space-y-8">

                    {
                        messages.map((msg, index) => (

                            <div
                                key={index}
                                className={`flex ${msg.sender === 'user'
                                        ? 'justify-end'
                                        : 'justify-start'
                                    }`}
                            >

                                <div
                                    className={`max-w-[75%] p-5 rounded-[30px] shadow-2xl backdrop-blur-xl border ${msg.sender === 'user'
                                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 border-violet-500/20'
                                            : 'bg-white/5 border-white/10'
                                        }`}
                                >

                                    <p className="whitespace-pre-wrap leading-8 text-lg">

                                        {msg.text}

                                    </p>

                                </div>

                            </div>

                        ))
                    }

                    {/* LOADING */}
                    {
                        loading && (

                            <div className="flex justify-start">

                                <div className="bg-white/5 border border-white/10 px-6 py-5 rounded-[30px] backdrop-blur-xl">

                                    <div className="flex gap-2">

                                        <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce"></div>

                                        <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce delay-100"></div>

                                        <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce delay-200"></div>

                                    </div>

                                </div>

                            </div>

                        )
                    }

                    <div ref={bottomRef}></div>

                </div>

            </div>

            {/* INPUT */}
            <div className="relative z-10 border-t border-white/10 bg-white/5 backdrop-blur-xl">

                <div className="max-w-5xl mx-auto p-6">

                    <div className="flex gap-4">

                        <input
                            type="text"
                            placeholder="Ask something..."
                            value={message}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            onKeyDown={(e) => {

                                if (e.key === 'Enter') {

                                    sendMessage()

                                }

                            }}
                            className="flex-1 bg-white/10 border border-white/10 rounded-2xl px-6 py-5 outline-none text-lg placeholder:text-gray-500 focus:border-violet-500"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={loading}
                            className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-105 transition-all px-10 rounded-2xl font-bold text-lg shadow-2xl disabled:opacity-50"
                        >

                            {
                                loading
                                    ? 'Thinking...'
                                    : 'Send 🚀'
                            }

                        </button>

                    </div>

                </div>

            </div>

        </div>

    )

}

export default CustomerChat