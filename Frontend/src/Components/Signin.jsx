import axios from 'axios'
import React, {useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import { toast } from "react-toastify";

function Signin() {
    const [signinform, setSigninform] = useState({
        Email: "",
        Password: ""
    })
    const API = 'http://localhost:7000/user/signin'
    const navigate = useNavigate()

    const handleChange = (e) => {
        setSigninform({ ...signinform, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const user = await axios.post(API, signinform)
            if (user.data.success) {
                 toast.success(user.data.message)
                localStorage.setItem('token', user.data.token)
                localStorage.setItem('login', "true")
            }
            navigate('/')
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message)
            } else {
                toast.error("Error found while submit SignIn form " + err.message)
            }
        }
    }

    return (
        <div className='bg-gray-50 min-h-screen flex flex-col items-center'>
            <div className='mt-16 '>
                <h2 className='text-center font-bold text-4xl text-gray-900'>LOG IN</h2>
            </div>
            <div className='bg-white p-6 rounded-lg border gap-4 border-gray-200 shadow-sm w-full mt-8 max-w-150 '>
                <form action="" onSubmit={handleSubmit} className='space-y-6'>
                    <input type="email" name='Email' value={signinform.Email} onChange={handleChange} placeholder='Email' className='w-full border border-gray-300 rounded px-3  py-1.5  text-lg focus:outline-none focus:border-black' required />
                    <input type="password" name='Password' value={signinform.Password} onChange={handleChange} placeholder='Password' className='w-full border border-gray-300 rounded px-3  py-1.5  text-lg focus:outline-none focus:border-black ' required />
                    <div className='flex justify-center mb-4'>
                        <button type='submit' className='bg-neutral-700 hover:bg-neutral-800 text-white px-5 py-2 rounded-xl text-xl cursor-pointer font-medium transform transition duratoin-300 hover:scale-110'>Sign In</button>
                    </div>
                    <div className='text-center pt-2 gap-20'>
                        <p>Need a account?...<Link to='/signup' className='text-gray-600 hover:text-black underline'>Sign Up</Link></p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signin

