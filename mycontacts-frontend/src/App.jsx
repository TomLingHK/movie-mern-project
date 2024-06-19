import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import CreateContact from './pages/CreateContact';
import DeleteContact from './pages/DeleteContact';
import GetContacts from './pages/GetContacts';

const App = () => {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/api/contacts' element={<CreateContact/>}/>
            <Route path='/api/contacts/:id' element={<DeleteContact/>}/>
            {/* <Route path='/api/contacts' element={<GetContacts/>}/> */}
        </Routes>
    )
}

export default App