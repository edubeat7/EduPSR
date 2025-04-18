import { useState, useEffect  } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch  } from "react-router-dom";
import Pagina1 from "./Component/Pagina1/Pagina1";
import Home from "./Component/Home/Home";
import PruebaAutomatica from "./Component/PruebaAutomatica/PruebaAutomatica";
import GeneradorPrueba from "./Component/PruebaAutomatica/GeneradorPrueba";
import MenuPaginas from "./Component/MenuPaginas/MenuPaginas";
import ListaVideos from "./Component/ListaVideos/ListaVideos";

import { createClient } from '@supabase/supabase-js'

function App() {


  const supabase = createClient(import.meta.env.VITE_APP_SUPABASE_URL, 
    import.meta.env.VITE_APP_SUPABASE_ANON_KEY);

  
  return (
    <div className="container">
    <Router>
     <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/Home">
          <Home />
        </Route>
        <Route exact path="/Pagina1">
          <Pagina1 />
        </Route>
        <Route exact path="/PruebaAutomatica">
          <PruebaAutomatica />
        </Route>
        <Route exact path="/GeneradorPrueba">
          <GeneradorPrueba />
        </Route>
        <Route exact path="/MenuPaginas">
          <MenuPaginas />
        </Route>
        <Route exact path="/ListaVideos">
          <ListaVideos />
        </Route>
     </Switch>
     </Router>
    </div>
  )
}

export default App
