

import Hero from "../components/Hero"

export default function Home() {
  return (
    <div className="fade-in">
      <Hero />

      <div className="container" style={{ marginTop: "2rem" }}>
        <div className="card">
          <h2 style={{ marginBottom: "0.5rem" }}>Bienvenid@ a MiniBlog EFI Java</h2>
          <p>Ingresá o registrate para crear, editar y eliminar tus publicaciones.</p>
        </div>
      </div>
    </div>
  )
}
