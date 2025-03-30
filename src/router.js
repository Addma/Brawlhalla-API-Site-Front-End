import * as React from 'react';
import { Routes, Route, createBrowserRouter, createRoutesFromElements, Outlet} from "react-router-dom";
import Rankings from './pages/rankings'
import Landing from './pages/landing.tsx'
import About from './pages/about'
import Profile from './pages/profile';
import Nav from './components/nav';
import RankingsSearch from './pages/rankingsSearch';
import { AuthProvider } from './context/AuthContext.js';
import Login from './pages/login.js';
import PrivateRoute from './components/PrivateRoute.js';

const Router = () => {      
 return createBrowserRouter(
    createRoutesFromElements(
  <Route path="/" element={<AuthProvider><Nav/></AuthProvider>}>
   <Route index element={<Landing />} />  {/* Only renders on `/` */}
  <Route path="/login/*" element={<AuthProvider><Login/></AuthProvider>} />
  <Route path="profile" element={<Landing />}>
      <Route path=":brawlhallaId" element={<Profile/>}/>
      <Route path="*" element={<h1>Error</h1>}/>
      <Route path='update' element={<AuthProvider><PrivateRoute/></AuthProvider>}/>
  </Route>

  <Route path="about" element={<About/>}/>

  <Route path="rankings" element={<Landing />}>
    <Route index element={<RankingsSearch />} />
    <Route path=":bracket/:region/:name/:page" element={<Rankings />} />
  </Route>

  </Route>
))
}
export default Router;