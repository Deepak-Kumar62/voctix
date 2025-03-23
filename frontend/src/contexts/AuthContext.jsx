import { createContext, useState, useNavigate } from 'react'
import { login, register } from '../services/authServices'

const AuthContext = createContext({})

export default AuthContext

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    const handleLogin = async (credential) => {
        try {
            const data = await login(credential)
            setUser(data.user)
            navigate("/home")
        } catch (error) {
            throw error
        }
    }

    const handleRegister = async (userData) => {
        try {
            const data = await register(userData)
            setUser(data.user)
            navigate("/home")
        } catch (error) {
            throw error
        }
    }

    const handleLogout = async () => {
        try {
            const data = await logout()
            setUser(data.user)
            navigate("/")
        } catch (error) {
            throw error
        }
    }

    return (
        <AuthContext.Provider value={{ user, handleLogin, handleRegister, handleLogout }}>
            {children}
        </AuthContext.Provider>
    )
}