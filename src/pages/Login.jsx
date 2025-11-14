import { useRef, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Toast } from 'primereact/toast'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { useAuth } from '../context/AuthContext'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const toast = useRef(null)
  const nav = useNavigate()
  const { login } = useAuth()

  const submit = async (e)=>{
    e.preventDefault()
    setLoading(true)
    try{
      await login(email, password)
      toast.current.show({severity:'success', summary:'OK', detail:'Sesión iniciada'})
      setTimeout(()=> nav('/posts'), 400)
    }catch(err){
      const msg = err?.response?.data?.error || err?.response?.data?.msg || 'Credenciales inválidas'
      toast.current.show({severity:'error', summary:'Error', detail: msg})
    }finally{ setLoading(false) }
  }

  return (
    <div className='container'>
      <Toast ref={toast}/>
      <div className='shell' style={{maxWidth:520, margin:'2rem auto'}}>
        <h3>Ingresar</h3>
        <form onSubmit={submit} className='p-fluid'>
          <label>Email</label>
          <InputText value={email} onChange={e=>setEmail(e.target.value)} required/>
          <label style={{marginTop:'.75rem'}}>Password</label>
          <Password value={password} onChange={(e)=>setPassword(e.target.value)} feedback={false} toggleMask required/>
          <Button type='submit' label={loading? 'Cargando...' : 'Ingresar'} disabled={loading} style={{marginTop:'1rem'}}/>
        </form>
        <p style={{marginTop:'1rem'}}>¿No tenés cuenta? <Link to='/register'>Registrarme</Link></p>
      </div>
    </div>
  )
}
