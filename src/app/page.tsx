export default function Home() {
  return (
    <main className="flex items-center min-h-screen p-24 bg-[url('../../public/team.svg')] bg-no-repeat bg-right-bottom">
      <div className='flex flex-col items-center'>
        <h1 className='mb-10 font-openSans font-bold text-6xl'>
          Bienvenido usuario
        </h1>
        <a
          href="/login"
          className="group rounded-lg border border-transparent px-5 py-4 text-white bg-blue-n transition-colors hover:border-blue-n hover:bg-white hover:text-blue-n"
          rel="noopener noreferrer"
        >
          <h2 className={`text-2xl font-openSans`}>
            LOGIN
          </h2>
        </a>
      </div>
    </main>
  )
}
