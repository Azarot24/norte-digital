'use client'
import { useAppSelector } from "@/redux/hooks"


export default function Dashboard() {
  const branchList = useAppSelector(state => state.persistedReducer.branchState)
  const clienteList = useAppSelector(state => state.persistedReducer.clienteState)
  const saleList = useAppSelector(state => state.persistedReducer.saleState)
  const vendedorList = useAppSelector(state => state.persistedReducer.vendedorState)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-[url('../../public/nubes.svg')] bg-cover">
      <h1 className='mb-10 font-openSans text-6xl text-black font-extrabold text-left self-end'>
        Ventas Realizadas
      </h1>
      <div className="flex flex-row space-x-3 overflow-x-auto w-full">
        {saleList.map((item, index) =>
            <a key={index} className="text-justify text-blue-n border-blue-n border-4 p-4 min-w-fit w-fit"
              href={"/sale/"+index}
            >
                <h1>ID: {index}</h1>
                <h1>Vendedor: {vendedorList[item.idVendedor].name+" "+vendedorList[item.idVendedor].lastname}</h1>
                <h1>Cliente: {clienteList[item.idCliente].name+" "+clienteList[item.idCliente].lastname}</h1>
                <h1>Sucursal: {branchList[item.idBranch].name}</h1>
                <h1>Fecha: {item.date}</h1>
                <h1>Total: {item.total}</h1>
            </a>
        )}
      </div>
    </main>
  )
}