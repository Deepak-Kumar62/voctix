import { createContext, useEffect, useState } from 'react'
import { login, register } from '../services/authServices'
import { useNavigate } from 'react-router-dom'

const AuthContext = createContext({})

export default AuthContext

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getCurrentUser();
                setUser(response.data);
            } catch {
                setUser(null);
            }
        };
        fetchUser();
    }, []);

    const handleLogin = async (credential) => {
        try {
            await login(credential)
            navigate("/home")
        } catch (error) {
            throw error
        }
    }

    const handleRegister = async (userData) => {
        try {
            const message = await register(userData)
            return message
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