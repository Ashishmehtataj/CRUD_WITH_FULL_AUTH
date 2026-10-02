import React, { useEffect, useState } from 'react'
import axios, { toFormData } from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Mainfile() {
    const [taskform, setTaskForm] = useState({
        Title: "",
        Description: "",
        addedDate: "",
        dueDate: "",
        Status: ""
    })
    const API = 'http://localhost:7000/task'
    const [editId, setEditId] = useState(null)
    const [task, setTask] = useState([])
    const [keyword, setKeyword] = useState("")   
    const token = localStorage.getItem("token")
    const login = localStorage.getItem("login")
    const navigate = useNavigate()

    const handleChange = (e) => {
        setTaskForm({ ...taskform, [e.target.name]: e.target.value })
    }

    const handleDate = (date) => {
        if (!date) {
            return;
        }
        return new Date(date).toISOString().slice(0, 16);
    }

    const getAllTask = async () => {
        try {
            const task = await axios.get(`${API}/gettasks`, { headers: { Authorization: `Bearer ${token}` } })
            setTask(task.data.data)
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message)
            } else {
                toast.error("Error found while getting task " + err.message)
            }
        }
    }

    const searchTask = async () => {
        if (!keyword.trim()) {
            getAllTask()
            return
        }
        try {
            const res = await axios.get(`${API}/searchtask/${keyword}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.data.success) {
                setTask(res.data.data)
                toast.success(res.data.message)
            }
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message)
            } else {
                toast.error("Error found while searching task " + err.message)
            }
        }
    }

    const submitTask = async (e) => {
        e.preventDefault()
        try {
            const payload = {
                ...taskform,
                addedDate: taskform.addedDate ? handleDate(taskform.addedDate) : '',
                dueDate: taskform.dueDate ? handleDate(taskform.dueDate) : "",
            }
            if (editId) {
                const updateTask = await axios.put(`${API}/updateTask/${editId}`, payload, { headers: { Authorization: `Bearer ${token}` } })
                if (updateTask.data.success) {
                    toast.success(updateTask.data.message)
                }
                setEditId(null)
            }
            else {
                const postTask = await axios.post(`${API}/createtask`, payload, { headers: { Authorization: `Bearer ${token}` } })
                if (postTask.data.success) {
                    toast.success(postTask.data.message)
                }
            }
            getAllTask()
            setTaskForm({
                Title: "",
                Description: "",
                addedDate: "",
                dueDate: "",
                Status: ""
            })
        } catch (err) {
            if (err.response) {
                toast.error(err.response.data.message);
            } else {
                toast.error("Error found while Submit Task " + err.message)
            }
        }

    }

    const editTask = (user) => {
        setEditId(user._id);
        setTaskForm({ Title: user.Title, Description: user.Description, addedDate: handleDate(user.addedDate), dueDate: handleDate(user.dueDate), Status: user.Status })
    }

    const deleteTask = async (id) => {
        if (window.confirm("Are you sure for Delete")) {
            try {
                const task = await axios.delete(`${API}/deletetask/${id}`, { headers: { Authorization: `Bearer ${token}` } })
                if (task.data.success) {
                    toast.info(task.data.message)
                }
                getAllTask();
            } catch (err) {
                if (err.response) {
                    toast.error(err.response.data.alert)
                } else {
                    toast.error("Error found while delete Task " + err.message)
                }
            }

        }
    }
    const logOut = () => {
        if (window.confirm("Are you sure for Logout?")) {
            localStorage.removeItem('token')
            localStorage.removeItem('login')
            toast.success("Log out success, Redirect to Log In form")
            navigate('/signin')
        }

    }

    useEffect(() => {
        getAllTask()
    }, [])

    useEffect(() => {
        if (login === 'true') {
            navigate("/")
        }
    }, [login])

    return (
        <div className='min-h-screen bg-gray-100 flex flex-col p-4 '>
            <div className=''>
                <div className='flex justify-between'>
                    <h1 className='text-center mb-16 text-gray-900 font-bold text-3xl ml-16'> CRUD PROGRAM </h1>
                    <button onClick={logOut} className='bg-neutral-700 hover:bg-neutral-800 uppercase text-white px-5 py-2 mr-8 rounded-xl text-xl cursor-pointer font-medium transition duration-200 mb-20'>Log out</button>
                </div>

                <h2 className='text-center text-2xl font-semibold uppercase'>{editId ? "Edit task " : "Add new task"}</h2>
                <div className='bg-white rounded-xl p-4 w-full border border-gray-300 mt-4 shadow max-w-270 flex flex-col items-center justify-center ml-52'>
                    <form action="" onSubmit={submitTask} className='space-y-4'>
                        <input type="text" name='Title' value={taskform.Title} placeholder='Title' onChange={handleChange} className='w-full rounded px-4 border border-gray-200 focus:outline-none text-xl py-2' required />
                        <textarea type="text" name='Description' value={taskform.Description} rows='4' cols='50' placeholder='Description' onChange={handleChange} className='w-full rounded px-4 border border-gray-200 focus:outline-none text-xl py-2' />
                        <input type="datetime-local" name='addedDate' value={taskform.addedDate} placeholder='Added Date' onChange={handleChange} className='w-full rounded px-4 border border-gray-200 focus:outline-none text-xl py-2' required />
                        <input type="datetime-local" name='dueDate' value={taskform.dueDate} placeholder='Due Date' onChange={handleChange} className='w-full rounded px-4 border border-gray-200 focus:outline-none text-xl py-2' required />
                        <select name="Status" id="" value={taskform.Status} onChange={handleChange} className='w-full rounded px-4 border border-gray-200 focus:outline-none text-xl py-2' required>
                            <option value='Select'>Select</option>
                            <option value="Complete">Complete</option>
                            <option value="Pending">Pending</option>
                            <option value="Incomplete">Incomplete</option>
                        </select>
                        <div className='text-center font-semibold'>
                            <button type='submit' className='bg-neutral-700 text-white text-2xl rounded-4xl p-2 cursor-pointer uppercase'>Submit Task</button>
                        </div>
                    </form>
                </div>
                <div className='bg-white mt-4 rounded-2xl p-2 border border-gray-200'>
                    <div className='flex justify-between p-8'>
                        <h2 className='font-bold text-3xl  uppercase'>All Task's</h2>
                        <div className='flex gap-2'>
                            <input
                                type="text"
                                placeholder="Search Task's by Title and Status"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                className='border border-gray-200 rounded py-1.5 px-2 focus:outline-none w-62'
                            />
                            <button onClick={searchTask} className='bg-neutral-700 text-white text-lg rounded-lg p-2 cursor-pointer '>Search</button>
                        </div>
                    </div>
                    <div className='flex flex-col p-2'>
                        <table className='w-full border-collapse border border-gray-300'>
                            <thead className='bg-gray-100'>
                                <tr>
                                    <th className='border border-gray-300 px-4 py-2'>Title</th>
                                    <th className='border border-gray-300 px-4 py-2'>Description</th>
                                    <th className='border border-gray-300 px-4 py-2'>Added Date</th>
                                    <th className='border border-gray-300 px-4 py-2'>Due Date</th>
                                    <th className='border border-gray-300 px-4 py-2'>Status</th>
                                    <th className='border border-gray-300 px-4 py-2'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    task.map((t)=>(
                                        <tr key={t._id} className='hover:bg-gray-50'>
                                            <td className='border border-gray-300 px-4 py-2 text-center'>{t.Title}</td>
                                            <td className='border border-gray-300 px-4 py-2 text-center'>{t.Description}</td>
                                            <td className='border border-gray-300 px-4 py-2 text-center'>{t.addedDate}</td>
                                            <td className='border border-gray-300 px-4 py-2 text-center'>{t.dueDate}</td>
                                            <td className='border border-gray-300 px-4 py-2 text-center'>{t.Status}</td>
                                            <td className='border border-gray-300 px-4 py-2 flex justify-around'>
                                                <button className='bg-blue-900 rounded p-2 cursor-pointer text-white' onClick={()=>editTask(t)}>Edit Task</button>
                                                <button className='bg-blue-900 rounded p-2 cursor-pointer text-white' onClick={()=>deleteTask(t._id)}>Delete Task</button>
                                            </td>
                                        </tr>
                                        
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Mainfile
