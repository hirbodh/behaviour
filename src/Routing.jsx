import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './Pages/Main/Main'
import BasicBehaviour from './Pages/Behaviour/BasicBehaviour'
import Home from './Pages/Home/Home'
import Create from './Pages/Behaviour/Create'
import Edit from './Pages/Behaviour/Edit'
import NotFound from './Pages/NotFound'

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<Home />} />
          <Route path="/BasicBehaviour" element={<BasicBehaviour />} />
          <Route path="/BasicBehaviour/create" element={<Create />} />
          <Route path="/BasicBehaviour/edit" element={<Edit />} />
          {/* <Route path="/BasicBehaviour/edit" element={<Edit />}>
            <Route path="edit/:id" element={<Edit />} />
          </Route> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
