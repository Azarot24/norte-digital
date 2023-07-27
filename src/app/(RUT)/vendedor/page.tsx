'use client'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from 'next/image';
import { addVendedor } from '@/redux/feature/vendedorSlice';

export default function Seller() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [tel, setTel] = useState('');
  const [date, setDate] = useState('');
  const [email, setEmail] = useState('');
  const [idDirection, setIdDirection] = useState(-1);
  const sellerList = useAppSelector(state => state.persistedReducer.vendedorState)
  const directionList = useAppSelector(state => state.persistedReducer.directionState)
  const dispatch = useAppDispatch()

  function createVendedor () {
    if (name !== '' && lastname !== '' && tel !== '' && idDirection !== -1 && date !=='' && email !== '') {
      const fecha = new Date(date)
      const fechaFormat = (fecha.getDate()+1)+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear()
      dispatch(addVendedor({name, lastname, tel, idDirection, date: fechaFormat, email}))
      setName('')
      setLastname('')
      setTel('')
      setEmail('')
      setDate('')
      setIdDirection(-1)
    }else{
      alert('Error, hay campos vacios')
    }
  }
  return (
    <main className="min-h-screen p-20 bg-gray-n">
      <div className='flex flex-row mb-4 space-x-4 border-gray-400 border-b-2'>
        <Image
          src="/mujer.svg"
          width={60}
          height={60}
          alt="Picture of the author"
        />
        <h1 className='font-openSans font-extrabold text-6xl text-black'>
          Vendedores
        </h1>
      </div>
      <h1 className='font-openSans font-bold text-4xl text-black mb-4'>
        Nuevo Vendedor
      </h1>
      <div className="flex w-full items-center space-x-2 border-blue-n border-b-2 pb-2 mb-6">
        <div className='w-full grid grid-cols-3 justify-items-start'>
            <input
              name="name"
              className=' rounded-lg border-black text-2xl border p-1'
              value={name}
              placeholder="nombre"
              onChange={e => setName(e.target.value)}
            />
            <input
              name="lastname"
              className=' rounded-lg border-black text-2xl border p-1'
              value={lastname}
              placeholder="apellido"
              onChange={e => setLastname(e.target.value)}
            />
            <div className='grid grid-cols-2 items-center w-full'>
              <p>Fecha de nacimiento</p>
              <input
                name="date"
                className=' rounded-lg border-black text-2xl border p-1'
                value={date}
                type="date"
                onChange={e => setDate(e.target.value)}
              />
            </div>
            <input
              name="tel"
              className='rounded-lg border-black text-2xl border p-1'
              value={tel}
              type='number'
              placeholder="telefono"
              onChange={e => setTel(e.target.value)}
            />
            <input
              name="email"
              className=' rounded-lg border-black text-2xl border p-1'
              value={email}
              placeholder="email"
              onChange={e => setEmail(e.target.value)}
            />
            <div className='grid grid-cols-2 items-center w-full'>
              <p>Dirección</p>
              <select
                className='rounded-lg border-black text-2xl border p-1'
                value={idDirection}
                onChange={(e) => {
                  setIdDirection(+e.target.value);
                }}
              >
                <option value={-1}>Seleccionar...</option>
                {directionList.map((item, index) =>
                    <option value={index} key={index}>{item.calle+' '+ item.numero+', '+item.comuna+','+item.ciudad}</option>
                )}
              </select>
            </div>
        </div>
        <a
          className="group rounded-lg border border-transparent px-4 py-2 text-white bg-blue-n transition-colors hover:border-blue-n hover:bg-white hover:text-blue-n"
          onClick={() => createVendedor()}
        >+</a>
      </div>
      <h1 className='font-openSans font-bold text-4xl text-black'>
        Listado de Vendedores
      </h1>
      <table className="border-collapse border border-slate-500 w-full rounded-lg">
        <thead>
          <tr>
            <th className="border border-slate-600">Nombre</th>
            <th className="border border-slate-600">Apellido</th>
            <th className="border border-slate-600">Telefono</th>
            <th className="border border-slate-600">Dirección</th>
            <th className="border border-slate-600">email</th>
            <th className="border border-slate-600">Fecha nacimiento</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {sellerList.map((item, index) =>{
            const dir = directionList[item.idDirection]
              return(
                 <tr key={index}>
                  <td className="border text-black border-gray-500">{item.name}</td>
                  <td className="border text-black border-gray-500">{item.lastname}</td>
                  <td className="border text-black border-gray-500">{item.tel}</td>
                  <td className="border text-black border-gray-500">{dir.calle+' '+ dir.numero+', '+dir.comuna+','+dir.ciudad}</td>
                  <td className="border text-black border-gray-500">{item.email}</td>
                  <td className="border text-black border-gray-500">{item.date}</td>
                </tr>
              )}
          )}
        </tbody>
      </table>
    </main>
  )
}
