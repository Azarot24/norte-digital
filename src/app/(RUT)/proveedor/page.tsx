'use client'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from 'next/image';
import { addProveedor } from '@/redux/feature/proveedorSlice';

export default function Proveedor() {
  const [name, setName] = useState('');
  const [web, setWeb] = useState('');
  const [tel, setTel] = useState('');
  const [idDirection, setIdDirection] = useState(-1);
  const proveedorList = useAppSelector(state => state.persistedReducer.proveedorState)
  const directionList = useAppSelector(state => state.persistedReducer.directionState)
  const dispatch = useAppDispatch()

  function createProveedor () {
    if (name !== '' && web !== '' && tel !== '' && idDirection !== -1) {
      dispatch(addProveedor({name, web, tel, idDirection}))
      setName('')
      setWeb('')
      setTel('')
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
          Proveedores
        </h1>
      </div>
      <h1 className='font-openSans font-bold text-4xl text-black mb-4'>
        Nuevo Proveedor
      </h1>
      <div className="flex w-full items-center space-x-2 border-blue-n border-b-2 pb-2 mb-6">
        <input
          name="name"
          className=' rounded-lg border-black text-2xl border p-1'
          value={name}
          placeholder="nombre"
          onChange={e => setName(e.target.value)}
        />
        <input
          name="web"
          className=' rounded-lg border-black text-2xl border p-1'
          value={web}
          placeholder="web URL"
          onChange={e => setWeb(e.target.value)}
        />
        <input
          name="tel"
          className='rounded-lg border-black text-2xl border p-1'
          value={tel}
          type='number'
          placeholder="telefono"
          onChange={e => setTel(e.target.value)}
        />
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
        <a
          className="group rounded-lg border border-transparent px-4 py-2 text-white bg-blue-n transition-colors hover:border-blue-n hover:bg-white hover:text-blue-n"
          onClick={() => createProveedor()}
        >
          +
        </a>
      </div>
      <h1 className='font-openSans font-bold text-4xl text-black'>
        Listado de Proveedores
      </h1>
      <table className="border-collapse border border-slate-500 w-full rounded-lg">
        <thead>
          <tr>
            <th className="border border-slate-600">Nombre</th>
            <th className="border border-slate-600">Web</th>
            <th className="border border-slate-600">Telefono</th>
            <th className="border border-slate-600">Dirección</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {proveedorList.map((item, index) =>{
            const dir = directionList[item.idDirection]
              return(
                 <tr key={index}>
                  <td className="border text-black border-gray-500">{item.name}</td>
                  <td className="border text-black border-gray-500">{item.web}</td>
                  <td className="border text-black border-gray-500">{item.tel}</td>
                  <td className="border text-black border-gray-500">{dir.calle+' '+ dir.numero+', '+dir.comuna+','+dir.ciudad}</td>
                </tr>
              )}
          )}
        </tbody>
      </table>
    </main>
  )
}
