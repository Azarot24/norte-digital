'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation'

export default function Login() {
  const [user, setUser] = useState('admin');
  const [pass, setPass] = useState('admin');
  const router = useRouter()

  function doLogin  () {
    if (user == 'admin' && pass == 'admin') {
      router.push('/dashboard')
    }else{
      alert('Error en las credenciales suministradas')
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[url('../../public/nubes.svg')] bg-cover">
      <h1 className='mb-10 font-openSans font-bold text-6xl text-blue-n'>
        Iniciar sesión
      </h1>
      <input
        name="user"
        className=' rounded-lg border-black text-2xl border mb-4 p-1'
        value={user}
        onChange={e => setUser(e.target.value)}
      />
      <input
        name="pass"
        className=' rounded-lg border-black text-2xl border mb-8 p-1'
        value={pass}
        type='password'
        onChange={e => setPass(e.target.value)}
      />
      <a
        className="group rounded-lg border border-transparent px-5 py-4 text-white bg-blue-n transition-colors hover:border-blue-n hover:bg-white hover:text-blue-n"
        onClick={() => doLogin()}
      >
        <h2 className={`text-2xl font-semibold`}>
          Login
        </h2>
      </a>
    </main>
  )
}
