import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Search from './pages/search/Search'
import Profile from './pages/profile/Profile'
import Home from './pages/home/Home'
import Genres from './pages/genre/Genres'
import Login from './pages/Login/Login'
import Header from './components/Header/Header'
import './styles/Theme.css'
import Admin from './pages/admin/Admin'
import OneAnime from './pages/oneAnime/OneAnime'
import OneWatchAnime from './pages/oneWatchAnime/OneWatchAnime'


function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path='/admin' element={<Admin/>}/>
        <Route path='/admin/anime/:id' element={<OneAnime/>}/>
        <Route path='/' element={<Search/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/anime/:id' element={<OneWatchAnime/>}/>
        <Route path='/genres' element={<Genres/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App