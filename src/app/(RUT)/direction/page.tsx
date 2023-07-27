'use client'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from 'next/image';
import { addDirection } from '@/redux/feature/directionSlice';

export default function Direction() {
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [comuna, setComuna] = useState('');
  const [ciudad, setCiudad] = useState('');
  const directionList = useAppSelector(state => state.persistedReducer.directionState)
  const dispatch = useAppDispatch()

  function createDirection  () {
    if (calle !== '' && numero !== '' && comuna !== '' && ciudad !== '') {
      dispatch(addDirection({calle, numero, comuna, ciudad}))
      setCalle('')
      setNumero('')
      setComuna('')
      setCiudad('')
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
          Direcciones
        </h1>
      </div>
      <h1 className='font-openSans font-bold text-4xl text-black mb-4'>
        Nueva dirección
      </h1>
      <div className="flex w-full items-center space-x-2 border-blue-n border-b-2 pb-2 mb-6">
        <input
          name="calle"
          className=' rounded-lg border-black text-2xl border p-1'
          value={calle}
          placeholder="calle"
          onChange={e => setCalle(e.target.value)}
        />
        <input
          name="numero"
          className=' rounded-lg border-black text-2xl border p-1'
          value={numero}
          placeholder="numero"
          onChange={e => setNumero(e.target.value)}
        />
        <input
          name="comuna"
          className=' rounded-lg border-black text-2xl border p-1'
          value={comuna}
          placeholder="comuna"
          onChange={e => setComuna(e.target.value)}
        />
        <input
          name="ciudad"
          className=' rounded-lg border-black text-2xl border p-1'
          value={ciudad}
          placeholder="ciudad"
          onChange={e => setCiudad(e.target.value)}
        />
        <a
          className="group rounded-lg border border-transparent px-4 py-2 text-white bg-blue-n transition-colors hover:border-blue-n hover:bg-white hover:text-blue-n"
          onClick={() => createDirection()}
        >
          +
        </a>
      </div>
      <h1 className='font-openSans font-bold text-4xl text-black'>
        Listado de direcciones
      </h1>
      <table className="border-collapse border border-slate-500 w-full rounded-lg">
        <thead>
          <tr>
            <th className="border border-slate-600">Calle</th>
            <th className="border border-slate-600">Numero</th>
            <th className="border border-slate-600">Comuna</th>
            <th className="border border-slate-600">Ciudad</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {directionList.map((item, index) =>{
              return(
                 <tr key={index}>
                  <td className="border text-black border-gray-500">{item.calle}</td>
                  <td className="border text-black border-gray-500">{item.numero}</td>
                  <td className="border text-black border-gray-500">{item.comuna}</td>
                  <td className="border text-black border-gray-500">{item.ciudad}</td>
                </tr>
              )}
          )}
        </tbody>
      </table>
    </main>
  )
}
