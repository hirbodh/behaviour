import React from 'react'
import SideBar from '../../Components/SideBar/SideBar'
import { Outlet } from 'react-router-dom'

import './MainStyle.css'

export default function Main() {
  return (
    <div className='main-container col-12 row'>
      <div className='sidebar-container col-2'>
        <SideBar />
      </div>
      <div className='pagecontent-container col-10'>
        <div className='inside-pagecontent-container'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
