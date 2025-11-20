import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Contexto de autenticación
import { AuthProvider, useAuth } from "./context/AuthContext";

// Componentes comunes
import Navbar from "./components/Navbar";

// Pages principales
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Posts
import PostsList from "./pages/PostsList";
import PostForm from "./pages/PostForm";
import PostDetail from "./pages/PostDetail";  

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>

          {/* Página principal */}
          <Route path="/" element={<Home />} />

          {/* Autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* POSTS */}
          <Route
            path="/posts"
            element={
              <PrivateRoute>
                <PostsList />
              </PrivateRoute>
            }
          />

          <Route
            path="/posts/new"
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            }
          />

          {/* EDITAR POST */}
          <Route
            path="/posts/:id"
            element={
              <PrivateRoute>
                <PostForm />
              </PrivateRoute>
            }
          />

          {/* VER DETALLES DEL POST (AQUÍ VAN LAS REVIEWS) */}
          <Route
            path="/posts/:id/view"
            element={
              <PrivateRoute>
                <PostDetail />
              </PrivateRoute>
            }
          />

          {/* Cualquier ruta desconocida */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
