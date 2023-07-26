import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { publicRoutes,privateRoutes } from './Routes/Routes';
import {useSelector} from 'react-redux'
const App = () => {
  const Auth=useSelector((state)=>state.authentication.isAuth)
  return (
    <BrowserRouter>
    <Routes>
    {
        publicRoutes.map((item,idx)=>{
          return(
           Auth===false && 
           <React.Fragment key={idx}>
          <Route path={item.path} element={item.element}/>
            </React.Fragment>
          )
        })
    }
      {
        privateRoutes.map((item,idx)=>{
          return(
           Auth===true && 
           <React.Fragment key={idx}>
            <Route path={item.path} element={item.element}/>
            </React.Fragment>
          )
        })
      }
    </Routes>
    </BrowserRouter>
  );
}

export default App;
