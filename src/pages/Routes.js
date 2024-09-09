import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Frontend from "./frontend"
import Auth from "./auth"
import Dashboard from "./dashboard"
import { useAuthContext } from 'contexts/AuthContext'


export default function Index() {
    const { isAuthenticated } = useAuthContext()
    return (
        <>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='auth/*' element={!isAuthenticated ? <Auth /> : <Navigate to={"/"} />} />
                <Route path='dashboard/*' element={<Dashboard />} />
            </Routes>
        </>
    )
}
