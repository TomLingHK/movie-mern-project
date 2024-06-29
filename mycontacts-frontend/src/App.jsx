import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import CreateContact from './pages/CreateContact';
import ShowContact from './pages/ShowContact';
import UpdateContact from './pages/UpdateContact';
import DeleteContact from './pages/DeleteContact';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/contacts' element={<CreateContact/>}/>
            <Route path='/contacts/details/:id' element={<ShowContact/>}/>
            <Route path='/contacts/edit/:id' element={<UpdateContact/>}/>
            <Route path='/contacts/delete/:id' element={<DeleteContact/>}/>
        </Routes>
    )
}

export default App;