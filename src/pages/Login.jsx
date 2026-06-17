import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
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
        'http://localhost:5000/api/auth/login',
        formData
      )

      // SAVE TOKEN
      localStorage.setItem(
        'token',
        response.data.token
      )

      alert('Login Successful 🚀')

      navigate('/dashboard')

    } catch (error) {

      alert(error.response.data.message)

    }

  }

  return (

    <div className="min-h-screen bg-black flex items-center justify-center px-6">

      {/* BACKGROUND GLOW */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-violet-700/20 blur-[120px] rounded-full" />

      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-700/20 blur-[120px] rounded-full" />

      {/* CARD */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[32px] p-10 shadow-[0_0_80px_rgba(124,58,237,0.25)]"
      >

        <h1 className="text-5xl font-black text-white text-center">
          Welcome Back 👋
        </h1>

        <p className="text-center text-gray-400 mt-4">
          Login to continue
        </p>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          onChange={handleChange}
          className="w-full mt-10 p-4 rounded-2xl bg-white/5 border border-white/10 text-white outline-none focus:border-violet-500"
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
          Login
        </button>

        {/* LINK */}
        <p className="text-center text-gray-400 mt-6">

          Don't have an account?

          <Link
            to="/signup"
            className="text-violet-400 ml-2"
          >
            Signup
          </Link>

        </p>

      </form>

    </div>

  )

}

export default Login