import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from "../config";

function Signup() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const response = await axios.post(
      `${API_URL}api/auth/signup`,
      formData
    );

      alert(response.data.message)

      navigate('/')

    } catch (error) {

      alert(error.response.data.message)

    }

  }

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      {/* BACKGROUND */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-700/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-700/20 blur-[120px] rounded-full" />

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-10 shadow-[0_0_80px_rgba(124,58,237,0.25)]"
      >

        <h1 className="text-5xl font-black text-white text-center">
          Create an Account 
        </h1>

        <p className="text-center text-gray-400 mt-4">
          Start your AI Customer Support
        </p>

        {/* NAME */}
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="w-full mt-10 p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-violet-500"
        />

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full mt-5 p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-violet-500"
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
          className="w-full mt-5 p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-violet-500"
        />

        {/* BUTTON */}
        <button
          className="w-full mt-8 bg-gradient-to-r from-violet-600 to-indigo-600 p-4 rounded-2xl text-white font-bold text-lg hover:scale-[1.02] transition-all"
        >
          Signup
        </button>

        {/* LINK */}
        <p className="text-center text-gray-400 mt-6">

          Already have account?

          <Link
            to="/"
            className="text-violet-400 ml-2"
          >
            Login
          </Link>

        </p>

      </form>

    </div>

  )

}

export default Signup