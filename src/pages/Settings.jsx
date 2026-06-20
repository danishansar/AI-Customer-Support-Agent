import axios from 'axios'
import { useEffect, useState } from 'react'
import { API_URL } from '../config'

function Settings() {

    const [formData, setFormData] = useState({

        name: '',
        email: '',
        company: '',
        password: ''

    })

    const [loading, setLoading] = useState(false)

    // FETCH PROFILE
    const fetchProfile = async () => {

        try {

            const token = localStorage.getItem('token')
            const response = await axios.get(
                 `${API_URL}/api/auth/profile`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setFormData({

                name: response.data.user.name || '',
                email: response.data.user.email || '',
                company: response.data.user.company || '',
                password: ''

            })

        } catch (error) {

            console.log(error)

        }

    }

    useEffect(() => {

        fetchProfile()

    }, [])

    // HANDLE CHANGE
    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        })

    }

    // UPDATE SETTINGS
    const updateSettings = async (e) => {

        e.preventDefault()

        try {

            setLoading(true)

            const token = localStorage.getItem('token')

            const response = await axios.put(
                 `${API_URL}/api/settings`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            alert(response.data.message)

            setLoading(false)

        } catch (error) {

            console.log(error)

            setLoading(false)

            alert('Update Failed')

        }

    }

    return (

        <div className="w-full text-white">

            {/* HEADER */}
            <div>

                <h1 className="text-5xl font-black">
                    Settings ⚙️
                </h1>

                <p className="text-gray-400 mt-3 text-lg">
                    Manage your account & company settings
                </p>

            </div>

            {/* FORM */}
            <form
                onSubmit={updateSettings}
                className="bg-[#0f172a] border border-white/10 rounded-[32px] p-10 mt-12 max-w-4xl"
            >

                {/* NAME */}
                <div className="mb-8">

                    <label className="block text-lg mb-3 font-semibold">
                        Full Name
                    </label>

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter name"
                        className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none"
                    />

                </div>

                {/* EMAIL */}
                <div className="mb-8">

                    <label className="block text-lg mb-3 font-semibold">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter email"
                        className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none"
                    />

                </div>

                {/* COMPANY */}
                <div className="mb-8">

                    <label className="block text-lg mb-3 font-semibold">
                        Company Name
                    </label>

                    <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Enter company"
                        className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none"
                    />

                </div>

                {/* PASSWORD */}
                <div className="mb-8">

                    <label className="block text-lg mb-3 font-semibold">
                        New Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter new password"
                        className="w-full bg-black border border-white/10 rounded-2xl p-5 outline-none"
                    />

                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 px-10 py-5 rounded-2xl font-bold text-lg"
                >

                    {
                        loading
                            ? 'Updating...'
                            : 'Save Settings 🚀'
                    }

                </button>

            </form>

        </div>

    )

}

export default Settings