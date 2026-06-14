import { Outlet } from 'react-router-dom' 
import Sidebar from './sidebar'
import { SearchProvider } from '../contexts/search-context'

const Layout = () => {
  return (
    <div className='grid grid-cols-5 md:grid-cols-4 h-screen overflow-y-hidden'>
      <aside className="sidebar ">
        <Sidebar />
      </aside>
      <SearchProvider >
        <main className='col-start-2 col-span-4 p-6 overflow-y-scroll'>
          <Outlet />
        </main>
      </SearchProvider>
    </div>
  )
}

export default Layout
