'use client'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from 'next/image';
import { addProducto } from '@/redux/feature/productoSlice';

export default function Producto() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [idBranch, setIdBranch] = useState(-1);
  const productList = useAppSelector(state => state.persistedReducer.productoState)
  const brachList = useAppSelector(state => state.persistedReducer.branchState)
  const dispatch = useAppDispatch()

  function createProduct () {
    if (name !== '' && price !== 0 && stock !== 0 && idBranch !== -1) {
      dispatch(addProducto({name, precio: price, stock, idBranch, id: productList.length}))
      setName('')
      setPrice(0)
      setStock(0)
      setIdBranch(-1)
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
          Productos
        </h1>
      </div>
      <h1 className='font-openSans font-bold text-4xl text-black mb-4'>
        Nuevo producto
      </h1>
      <div className="flex w-full items-center space-x-2 border-blue-n border-b-2 pb-2 mb-6">
        <input
          name="name"
          className=' rounded-lg border-black text-2xl border p-1'
          value={name}
          placeholder="nombre"
          onChange={e => setName(e.target.value)}
        />
        <p>Precio</p>
        <input
          name="price"
          className=' rounded-lg border-black text-2xl border p-1'
          value={price}
          placeholder="precio"
          type='number'
          onChange={e => setPrice(+e.target.value)}
        />
        <p>Stock</p>
        <input
          name="stock"
          className='rounded-lg border-black text-2xl border p-1'
          value={stock}
          placeholder="stock"
          type='number'
          onChange={e => setStock(+e.target.value)}
        />
        <p>Sucursal</p>
        <select
          className='rounded-lg border-black text-2xl border p-1'
          value={idBranch}
          onChange={(e) => {
            setIdBranch(+e.target.value);
          }}
        >
          <option value={-1}>Seleccionar...</option>
          {brachList.map((item, index) =>
              <option value={index} key={index}>{item.name}</option>
          )}
        </select>
        <a
          className="group rounded-lg border border-transparent px-4 py-2 text-white bg-blue-n transition-colors hover:border-blue-n hover:bg-white hover:text-blue-n"
          onClick={() => createProduct()}
        >
          +
        </a>
      </div>
      <h1 className='font-openSans font-bold text-4xl text-black'>
        Listado de productos
      </h1>
      <table className="border-collapse border border-slate-500 w-full rounded-lg">
        <thead>
          <tr>
            <th className="border border-slate-600">Id</th>
            <th className="border border-slate-600">Nombre</th>
            <th className="border border-slate-600">Precio</th>
            <th className="border border-slate-600">Stock</th>
            <th className="border border-slate-600">Sucursal</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {productList.map((item, index) =>{
              return(
                 <tr key={index}>
                  <td className="border text-black border-gray-500">{item.id}</td>
                  <td className="border text-black border-gray-500">{item.name}</td>
                  <td className="border text-black border-gray-500">{item.precio}</td>
                  <td className="border text-black border-gray-500">{item.stock}</td>
                  <td className="border text-black border-gray-500">{brachList[item.idBranch].name}</td>
                </tr>
              )}
          )}
        </tbody>
      </table>
    </main>
  )
}
