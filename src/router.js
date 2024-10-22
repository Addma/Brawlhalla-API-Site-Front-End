import * as React from 'react';
import { Routes, Route, createBrowserRouter, createRoutesFromElements, Outlet} from "react-router-dom";
import Rankings from './pages/rankings'
import Landing from './pages/landing'
import About from './pages/about'
import Profile from './pages/profile';
import Nav from './components/nav';
import RankingsSearch from './pages/rankingsSearch';

const Router = () => {      
  const RankingsLayout = () => {
    return (
      <>
        <Landing />
        <RankingsSearch />
        <Outlet /> {/* This will render the nested routes */}
      </>
    );
  };
 return createBrowserRouter(
    createRoutesFromElements(
  <Route path="/" element={<Nav/>}>
   <Route index element={<Landing />} />  {/* Only renders on `/` */}
   
  <Route path="profile" element={<Landing />}>
      <Route path=":brawlhallaId" element={<Profile/>}/>
      <Route path="*" element={<h1>Error</h1>}/>
  </Route>

  <Route path="about" element={<About/>}/>

  <Route path="rankings" element={<Landing />}>
    <Route index element={<RankingsSearch />} />  {/* Only renders on `/` */}
    <Route path=":bracket/:region/:name/:page" element={<Rankings />} />
  </Route>

  </Route>
))
}
export default Router;