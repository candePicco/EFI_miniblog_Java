import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import jwtDecode from 'jwt-decode'
import api from '../api/api'

const AuthContext = createContext(null)

export const AuthProvider = ({ children })=>{
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [user, setUser] = useState(null)

  useEffect(()=>{
    if(token){
      localStorage.setItem('token', token)
      try{
        const dec = jwtDecode(token)
        setUser({
          id: dec.id || dec.user_id || dec.sub,
          username: dec.username || dec.name || dec.email?.split('@')[0],
          email: dec.email,
          role: dec.role || 'user'
        })
      }catch{ setUser(null) }
    }else{
      localStorage.removeItem('token')
      setUser(null)
    }
  }, [token])

  const login = async (email, password)=>{
    const { data } = await api.post('/login', { email, password })
    setToken(data.access_token || data.token || data.jwt)
    return data
  }

  const register = async (payload)=>{
    const { data } = await api.post('/register', payload)
    return data
  }

  const logout = ()=> setToken(null)

  const value = useMemo(()=>({ token, user, isAuthenticated: !!token, login, register, logout }), [token, user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = ()=> useContext(AuthContext)
