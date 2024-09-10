import Header from 'components/Header'
import React from 'react'
import Home from "./Home"
import { Route, Routes } from 'react-router-dom'
export default function index() {
    return (
        <>
            <Header />
            <Routes>
                <Route index element={<Home />} />
            </Routes>
        </>
    )
}
