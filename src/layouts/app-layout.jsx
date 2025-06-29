import React from 'react'
import { Outlet } from 'react-router-dom';
import Header from '../components/header';

const AppLayout = () => {
  return <div>
    <main className='min-h-screen container mx-auto'>
        <Header />
        <Outlet />
    </main>

    {/* {Footer} */}
    <div className='p-10 text-center bg-gray-800 mt-10'>
        This is the 💖 footer
    </div>

  </div>
}

export default AppLayout;
