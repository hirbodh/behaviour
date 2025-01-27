import React from 'react'
import notFound from '../Data/notfound.png'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <div className='notfound-styles'>
        <img className='col-2' src={notFound} alt="alt" />
        <Link to={"/BasicBehaviour"} >
          <button className='btn btn-dark'>Return</button>
        </Link>
      </div>
    </div>
  )
}
