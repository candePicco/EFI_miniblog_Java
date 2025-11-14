import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { useAuth } from '../context/AuthContext'

export default function Register(){
  const [form, setForm] = useState({ username:'', email:'', password:'' })
  const [loading, setLoading] = useState(false)
  const toast = useRef(null)
  const nav = useNavigate()
  const { register } = useAuth()

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      await register(form)
      toast.current.show({severity:'success', summary:'OK', detail:'Usuario creado, podés iniciar sesión'})
      setTimeout(()=> nav('/login'), 500)
    }catch(err){
      const msg = err?.response?.data?.error || err?.response?.data?.msg || 'No se pudo registrar'
      toast.current.show({severity:'error', summary:'Error', detail: msg})
    }finally{ setLoading(false) }
  }

  return (
    <div className='container'>
      <Toast ref={toast}/>
      <div className='shell' style={{maxWidth:560, margin:'2rem auto'}}>
        <h3>Registrarme</h3>
        <form onSubmit={submit} className='p-fluid'>
          <label>Nombre de usuario</label>
          <InputText value={form.username} onChange={e=>setForm({...form, username:e.target.value})} required/>
          <label style={{marginTop:'.75rem'}}>Email</label>
          <InputText type='email' value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required/>
          <label style={{marginTop:'.75rem'}}>Password</label>
          <Password value={form.password} onChange={e=>setForm({...form, password:e.target.value})} feedback={false} toggleMask required/>
          <Button type='submit' label={loading? 'Cargando...' : 'Crear cuenta'} disabled={loading} style={{marginTop:'1rem'}}/>
        </form>
        <p style={{marginTop:'1rem'}}>¿Ya tenés cuenta? <Link to='/login'>Ingresar</Link></p>
      </div>
    </div>
  )
}
