import React, { createContext, useContext, useReducer } from 'react'

const Auth = createContext()

const initialState = { user: {}, isAuthenticated: false, isAdmin: false }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "USER_LOGGED_IN": return { ...state, user: payload.user, isAdmin: false }
        case "UPDATE_USER": return { ...state, ...payload.user }
        case "USER_LOG_OUT": return { initialState }
        default: return state
    }
}
export default function AuthContext({ children }) {
    const [authState, dispatch] = useReducer(reducer, initialState)

    return (
        <Auth.Provider value={{ ...authState, dispatch }}>{children}</Auth.Provider>
    )
}


export const useAuthContext = () => useContext(Auth)


