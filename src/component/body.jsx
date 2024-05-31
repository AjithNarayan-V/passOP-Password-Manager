import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const body = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setpasswordArray] = useState([])


    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setpasswordArray(JSON.parse(passwords))
        }

    }, [])


    const showPassword = () => {
        // passwordRef.current.type="password"  

        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png"
            passwordRef.current.type = "text"
        }
        else {
            ref.current.src = "icons/eyecross.png"
            passwordRef.current.type = "password"

        }
    }
    const savePassword = () => {

        if (form.site.length > 1 && form.username.length > 1 && form.password.length > 1) {
            console.log(form)
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }]))
            console.log([...passwordArray, { ...form, id: uuidv4() }])
            setform({ site: "", username: "", password: "" })
        }
        else{
            toast('No data in fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const editPassword = (id) => {

        console.log("editing pass" + id)
        setform(passwordArray.filter(item => item.id === id)[0])
        setpasswordArray(passwordArray.filter(item => item.id !== id))


    }

    const deletePassword = (id) => {

        console.log("deleting pass" + id)
        let c = confirm("Do you want to delete?")
        if (c) {
            setpasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }

    const copytext = (text) => {
        toast('text copied', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
        navigator.clipboard.writeText(text)
    }


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            {/* Same as */}
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-screen w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>


            <div className='text-center  mycontainer'>
                <div className='text-xl font-bold '>
                    <span className='text-green-600'>&lt;</span>
                    <span >pass</span>
                    <span className='text-green-600'>OP&gt;</span>
                </div>
                <p className='text-lg'>Your own Password Manager</p>

                <div className='flex flex-col items-center   text-black gap-8 '>
                    <input value={form.site} onChange={handleChange} placeholder='Enter the URL' type="text " className='border border-green-500 mt-3 rounded-full p-1.5 px-3 w-full' name='site' />
                    <div className="flex gap-4 justify-between w-full">
                        <input value={form.username} onChange={handleChange} placeholder='Enter User id' type="text" className='border border-green-500 w-full rounded-full p-1.5 px-3' name='username' />
                        <div className='relative w-full'>
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Pasword' type="password" className='border border-green-500 w-full rounded-full p-1.5 px-3' name='password' />
                            <span onClick={showPassword} className='absolute right-[18px] top-[6px] cursor-pointer '>
                                <img ref={ref} className='p-1' width={26} src="icons/eyecross.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button onClick={savePassword} className='flex justify-center  p-1.5  items-center gap-2 bg-green-400 hover:bg-green-300 rounded-full px-8  w-fit border border-green-900'>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover"
                                style={{ width: '24px', height: '24px' }} // Adjust size as needed
                            >
                            </lord-icon>
                            Add Password
                        </button>
                    </div>
                </div>
                <div className='passwords text-left'>
                    <h2 className='m-2 font-bold text-xl'>Your Password</h2>
                    {passwordArray.length === 0 && <div>No Passwords to Show</div>}
                    {passwordArray.length != 0 &&

                        <div className="relative overflow-x-auto">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-hidden rounded">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="text-center px-6 py-3">
                                            Sites
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3">
                                            Username
                                        </th>
                                        <th scope="col" className="text-center px-6 py-3">
                                            Password
                                        </th> <th scope="col" className=" text-center px-6 py-3">
                                            Edit
                                        </th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {passwordArray.map((item, index) => {
                                        return <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                            <td scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className='flex items-start justify-center'>
                                                    <a href={item.site} target='_blank'> {item.site}</a>
                                                    <div onClick={() => { copytext(item.site) }} className='loardiconcopytext px-2 invert size-7 top-2 items-center '>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                            trigger="hover"
                                                            style={{ width: '17px', height: '17spx' }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className='flex items-start justify-center'>
                                                    <a> {item.username}</a>
                                                    <div onClick={() => { copytext(item.username) }} className='loardiconcopytext px-2 invert size-7 top-2 items-center '>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                            trigger="hover"
                                                            style={{ width: '17px', height: '17spx' }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <div className='flex items-start justify-center'>
                                                    <a > {item.password}</a>
                                                    <div onClick={() => { copytext(item.password) }} className='loardiconcopytext px-2 invert size-7 top-2 items-center '>
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                                                            trigger="hover"
                                                            style={{ width: '17px', height: '17spx' }}>
                                                        </lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td scope="row" className=" font-medium invert ">
                                                <div className='flex items-start justify-center gap-3'>
                                                    <div className='editicon' onClick={() => { editPassword(item.id) }}><lord-icon
                                                        src="https://cdn.lordicon.com/ylvuooxd.json"
                                                        trigger="hover"
                                                        style={{ width: "18px", height: "18px" }}>
                                                    </lord-icon>
                                                    </div>
                                                    <div className='deleteicon' onClick={() => { deletePassword(item.id) }}><lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        style={{ width: "18px", height: "18px" }}>
                                                    </lord-icon>
                                                    </div>

                                                </div>

                                            </td>
                                        </tr>
                                    })}
                                </tbody>

                            </table>
                        </div>
                    }


                </div>
            </div>

        </>
    )
}

export default body