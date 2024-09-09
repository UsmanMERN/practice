import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import ForgetPassword from './ForgetPassword.js'

export default function Index() {
    return (
        <>
            <main>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/forget-password' element={<ForgetPassword />} />
                </Routes>
            </main>
        </>
    )
}
