'use client'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addBranch } from "@/redux/feature/branchSlice";
import Image from 'next/image';

export default function Branch() {
  const [name, setName] = useState('');
  const [currency, setCurrency] = useState('');
  const listBranch = useAppSelector(state => state.persistedReducer.branchState)
  const dispatch = useAppDispatch()

  function createBranch  () {
    if (name !== '' && currency !== '') {
      dispatch(addBranch({name: name, currency: currency}))
      setName('')
      setCurrency('')
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
          Sucursales
        </h1>
      </div>
      <h1 className='font-openSans font-bold text-4xl text-black mb-4'>
        Nueva Sucursal
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
          name="currency"
          className=' rounded-lg border-black text-2xl border p-1'
          value={currency}
          placeholder="moneda"
          onChange={e => setCurrency(e.target.value)}
        />
        <a
          className="group rounded-lg border border-transparent px-4 py-2 text-white bg-blue-n transition-colors hover:border-blue-n hover:bg-white hover:text-blue-n"
          onClick={() => createBranch()}
        >
          +
        </a>
      </div>
      <h1 className='font-openSans font-bold text-4xl text-black'>
        Listado de sucursales
      </h1>
      <table className="border-collapse border border-slate-500 w-full rounded-lg">
        <thead>
          <tr>
            <th className="border border-slate-600">Nombre</th>
            <th className="border border-slate-600">Moneda</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {listBranch.map((item, index) =>{
              return(
                 <tr key={index}>
                  <td className="border text-black border-gray-500">{item.name}</td>
                  <td className="border text-black border-gray-500">{item.currency}</td>
                </tr>
              )}
          )}
        </tbody>
      </table>
    </main>
  )
}
