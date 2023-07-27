'use client'
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import Image from 'next/image';
import { addSale } from '@/redux/feature/saleSlice';
import { Producto } from '@/redux/feature/productoSlice';
import { addDetail } from '@/redux/feature/detailSlice';

interface CarItem {
  idProducto: number,
  nameProducto: string,
  cantidad: number,
  precio: number,
  subtotal: number,
}

export default function NewSale() {
  const [idProducto, setIdProducto] = useState(-1);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);
  const [carList, setcarList] = useState<CarItem[]>([]);
  const [idCliente, setIdCliente] = useState(-1);
  const [idVendedor, setIdVendedor] = useState(-1);
  const [idBranch, setIdBranch] = useState(-1);
  const [productList, setProductList] = useState<Producto[]>([]);
  const productListAll = useAppSelector(state => state.persistedReducer.productoState)
  const brachList = useAppSelector(state => state.persistedReducer.branchState)
  const clientList = useAppSelector(state => state.persistedReducer.clienteState)
  const vendedorList = useAppSelector(state => state.persistedReducer.vendedorState)
  const saleList = useAppSelector(state => state.persistedReducer.saleState)
  const dispatch = useAppDispatch()

  function createSale () {
    if (idCliente !== -1 && idVendedor !== -1 && idBranch !== -1) {
      const fecha = new Date()
      const fechaFormat = (fecha.getDate()+1)+'/'+(fecha.getMonth()+1)+'/'+fecha.getFullYear()
      let idSale = saleList.length
      for (let i = 0; i < carList.length; i++) {
        dispatch(addDetail({idProducto: carList[i].idProducto, cantidad: carList[i].cantidad, precio: carList[i].precio, subtotal: carList[i].subtotal, idSale}))
      }
      dispatch(addSale({date: fechaFormat, idCliente, idVendedor, idBranch, total}))
      setIdBranch(-1)
      setIdCliente(-1)
      setIdVendedor(-1)
      setQty(0)
      setIdProducto(-1)
      setcarList([])
      setProductList([])
      setTotal(0)
      alert('Compra Realizada')
    }else{
      alert('Error, hay campos vacios')
    }
  }
  function addCart () {
    if (qty !== 0 && idProducto !== -1) {
      let list: CarItem[] = carList
      let prod = productList.filter(item => item.id == idProducto)[0]
      let subtotal = qty*prod.precio
      list.push({idProducto, nameProducto: prod.name, precio: prod.precio, cantidad: qty, subtotal})
      setcarList(list)
      setQty(0)
      setIdProducto(-1)
      setTotal(total + subtotal)
    }else{
      alert('Error, hay campos vacios')
    }
  }
  function searchProducts(id:number) {
    setIdBranch(id)
    setIdProducto(-1)
    let list = productListAll.filter(item => item.idBranch==id)
    setProductList(list)
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
      <div className="flex w-full items-center space-x-2 border-blue-n border-b-2 pb-2 mb-6 justify-between">
        <p>Cliente</p>
        <select
          className='rounded-lg border-black text-2xl border p-1'
          value={idCliente}
          onChange={(e) => {
            setIdCliente(+e.target.value);
          }}
        >
          <option value={-1}>Seleccionar...</option>
          {clientList.map((item, index) =>
              <option value={index} key={index}>{item.name+' '+ item.lastname}</option>
          )}
        </select>
        <p>Vendedor</p>
        <select
          className='rounded-lg border-black text-2xl border p-1'
          value={idVendedor}
          onChange={(e) => {
            setIdVendedor(+e.target.value);
          }}
        >
          <option value={-1}>Seleccionar...</option>
          {vendedorList.map((item, index) =>
              <option value={index} key={index}>{item.name+' '+ item.lastname}</option>
          )}
        </select>
        <p>Sucursal</p>
        <select
          className='rounded-lg border-black text-2xl border p-1'
          value={idBranch}
          onChange={(e) => {
            searchProducts(+e.target.value);
          }}
        >
          <option value={-1}>Seleccionar...</option>
          {brachList.map((item, index) =>
              <option value={index} key={index}>{item.name}</option>
          )}
        </select>
        {idBranch!==-1 && <p>Moneda: {brachList[idBranch].currency}</p>}
      </div>
      {idBranch!==-1 &&
      <div className='w-full grid grid-cols-3 justify-items-center'>
        <div className='grid grid-cols-2 items-center w-full'>
          <p>Producto</p>
          <select
            className='rounded-lg border-black text-2xl border p-1'
            value={idProducto}
            onChange={(e) => {
              setIdProducto(+e.target.value);
            }}
          >
            <option value={-1}>Seleccionar...</option>
            {productList.map((item) =>
                <option value={item.id} key={item.id}>{item.name}</option>
            )}
          </select>
        </div>
        <div className='grid grid-cols-2 items-center w-full'>
          <p>Cantidad</p>
          <input
            name="qty"
            className='rounded-lg border-black text-2xl border p-1'
            value={qty}
            placeholder="cantidad"
            type='number'
            onChange={e => setQty(+e.target.value)}
          />
        </div>
        <a className="group rounded-lg border border-transparent px-4 py-2 text-white bg-blue-n transition-colors hover:border-blue-n hover:bg-white hover:text-blue-n"
          onClick={() => addCart()}
        >+</a>
      </div>}
      <h1 className='font-openSans font-bold text-4xl text-black'>
        Listado de productos
      </h1>
      <table className="border-collapse border border-slate-500 w-full rounded-lg">
        <thead>
          <tr>
            <th className="border border-slate-600">Nombre</th>
            <th className="border border-slate-600">Precio</th>
            <th className="border border-slate-600">Cantidad</th>
            <th className="border border-slate-600">Subtotal</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {carList.map((item, index) =>{
              return(
                 <tr key={index}>
                  <td className="border text-black border-gray-500">{item.nameProducto}</td>
                  <td className="border text-black border-gray-500">{item.precio}</td>
                  <td className="border text-black border-gray-500">{item.cantidad}</td>
                  <td className="border text-black border-gray-500">{item.subtotal}</td>
                </tr>
              )}
          )}
        </tbody>
      </table>
      <div className='flex flex-col w-full items-end'>
        <h1>Total: {total}</h1>
        <a className="group rounded-lg border border-transparent px-4 py-2 text-white bg-blue-n transition-colors hover:border-blue-n hover:bg-white hover:text-blue-n"
          onClick={() => createSale()}
        >Save</a>
      </div>
    </main>
  )
}
