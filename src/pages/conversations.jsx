import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../config'

function Conversations() {

    const [conversations, setConversations] = useState([])

    useEffect(() => {

        fetchConversations()

    }, [])

    const fetchConversations = async () => {

        try {

            const response = await axios.get(
                 `${API_URL}api/conversations/6a09751be3b0520f2391632e`
            )

            setConversations(response.data)

        } catch (error) {

            console.log(error)

        }

    }

    return (

        <div className="p-10 text-white">

            <h1 className="text-4xl font-bold mb-8">
                Conversations
            </h1>

            <div className="space-y-4">

                {
                    conversations.map((chat) => (

                        <div
                            key={chat._id}
                            className="bg-gray-900 p-5 rounded-xl"
                        >

                            <p className="text-violet-400 mb-2">
                                Customer:
                            </p>

                            <p className="mb-4">
                                {chat.customerMessage}
                            </p>

                            <p className="text-green-400 mb-2">
                                AI Reply:
                            </p>

                            <p>
                                {chat.aiReply}
                            </p>

                        </div>

                    ))
                }

            </div>

        </div>

    )

}

export default Conversations