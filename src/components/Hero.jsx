import { Link } from "react-router-dom"

export default function Hero() {
  return (
    <section className="hero fade-in">
      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">MiniBlog 2025</h1>

        <p className="hero-subtitle">
          Compartí ideas, comentá publicaciones y disfrutá de una experiencia moderna y súper intuitiva.
        </p>

        <div className="hero-buttons">
          <Link to="/posts" className="btn btn-primary hero-btn">Ver Posts</Link>
          <Link to="/login" className="btn btn-outline hero-btn">Ingresar</Link>
        </div>
      </div>
    </section>
  )
}
