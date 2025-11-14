import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { Button } from 'primereact/button'
import { Sidebar } from 'primereact/sidebar'

export default function Navbar() {

  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [menuVisible, setMenuVisible] = useState(false)

  const handleLogout = () => {
    logout()
    nav('/login')
  }

  return (
    <header className="navbar-container">
      <div className="navbar">
        
        {/* Logo */}
        <h2 className="logo" onClick={() => nav('/')}>
          MiniBlog
        </h2>

        {/* ===== MENU DESKTOP ===== */}
        <nav className="menu-desktop">

          <Link to="/" className="nav-link">Inicio</Link>

          {user && (
            <Link to="/posts" className="nav-link">Posts</Link>
          )}

          {user && (
            <Link to="/reviews" className="nav-link">Reviews</Link>
          )}

          {user?.role === 'admin' && (
            <Link to="/admin" className="nav-link">Panel Admin</Link>
          )}

         
          {!user ? (
            <Button 
              label="Login" 
              className="p-button-sm p-button-success" 
              onClick={() => nav('/login')} 
            />
          ) : (
            <Button 
              label="Salir" 
              className="p-button-sm p-button-danger" 
              onClick={handleLogout} 
            />
          )}
          
        </nav>

       
        <Button 
          icon="pi pi-bars" 
          className="p-button-text menu-mobile-btn" 
          onClick={() => setMenuVisible(true)}
        />

      </div>

     
      <Sidebar 
        visible={menuVisible} 
        position="right" 
        onHide={() => setMenuVisible(false)}
        className="mobile-sidebar"
      >
        <h3>Menú</h3>

        <Link 
          to="/" 
          className="sidebar-link" 
          onClick={() => setMenuVisible(false)}
        >
          Inicio
        </Link>

        {user && (
          <Link 
            to="/posts" 
            className="sidebar-link"
            onClick={() => setMenuVisible(false)}
          >
            Posts
          </Link>
        )}

        {user && (
          <Link 
            to="/reviews"
            className="sidebar-link"
            onClick={() => setMenuVisible(false)}
          >
            Reviews
          </Link>
        )}

        {user?.role === 'admin' && (
          <Link
            to="/admin"
            className="sidebar-link"
            onClick={() => setMenuVisible(false)}
          >
            Panel Admin
          </Link>
        )}

        {/* Botón móvil */}
        {!user ? (
          <Button 
            label="Login" 
            className="p-button-sm p-button-success mt-3" 
            onClick={() => {
              nav('/login')
              setMenuVisible(false)
            }} 
          />
        ) : (
          <Button 
            label="Logout" 
            className="p-button-sm p-button-danger mt-3" 
            onClick={() => {
              handleLogout()
              setMenuVisible(false)
            }} 
          />
        )}

      </Sidebar>
    </header>
  )
}
