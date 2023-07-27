'use client'
import { useAppSelector } from "@/redux/hooks";
import Image from 'next/image';

export default function SaleDetail({ params }:{ params : any }) {
  const { id } = params
  const productList = useAppSelector(state => state.persistedReducer.productoState)
  const detailList = useAppSelector(state => state.persistedReducer.detailState)
  const sale = useAppSelector(state => state.persistedReducer.saleState)[id]
  const brach = useAppSelector(state => state.persistedReducer.branchState)[sale.idBranch]
  const client = useAppSelector(state => state.persistedReducer.clienteState)[sale.idCliente]
  const seller = useAppSelector(state => state.persistedReducer.vendedorState)[sale.idVendedor]

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
          Venta id: {id} Fecha: {sale.date}
        </h1>
      </div>
      <div className="grid grid-cols-2 font-semibold text-xl border-blue-n border-b-2 mb-4 p-2">
        <h1>Cliente: {client.name+' '+client.lastname}</h1>
        <h1>Vendedor: {seller.name+' '+seller.lastname}</h1>
        <h1>Sucursal: {brach.name}</h1>
        <h1>Total: {sale.total+' '+ brach.currency}</h1>
      </div>
      <h1 className='font-openSans font-bold text-4xl text-black'>
        Detalle de la Compra
      </h1>
      <table className="border-collapse border border-slate-500 w-full rounded-lg">
        <thead>
          <tr>
            <th className="border border-slate-600">Id Producto</th>
            <th className="border border-slate-600">Nombre Producto</th>
            <th className="border border-slate-600">Precio</th>
            <th className="border border-slate-600">Stock</th>
            <th className="border border-slate-600">Subtotal</th>
          </tr>
        </thead>
        <tbody className='bg-white'>
          {detailList.filter(item => item.idSale == id).map((item, index) =>{
            let prod = productList.filter(i => i.id == item.idProducto)[0]
              return(
                 <tr key={index}>
                  <td className="border text-black border-gray-500">{item.idProducto}</td>
                  <td className="border text-black border-gray-500">{prod.name}</td>
                  <td className="border text-black border-gray-500">{item.precio}</td>
                  <td className="border text-black border-gray-500">{item.cantidad}</td>
                  <td className="border text-black border-gray-500">{item.subtotal}</td>
                </tr>
              )}
          )}
        </tbody>
      </table>
    </main>
  )
}
