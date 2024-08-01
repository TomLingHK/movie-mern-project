import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import CreateMovie from './pages/CreateMovie';
import ShowMovie from './pages/ShowMovie';
import UpdateMovie from './pages/UpdateMovie';
import DeleteMovie from './pages/DeleteMovie';

function App() {
    return (
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/movies' element={<CreateMovie/>}/>
            <Route path='/movies/details/:id' element={<ShowMovie/>}/>
            <Route path='/movies/edit/:id' element={<UpdateMovie/>}/>
            <Route path='/movies/delete/:id' element={<DeleteMovie/>}/>
        </Routes>
    )
}

export default App;