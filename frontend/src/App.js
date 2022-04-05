import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createBrowserHistory } from 'history';

// import Home from '../pages/Home'
// import Login from '../containers/Login'
// import RecoveryPassword from '../containers/RecoveryPassword'
import NotFound from './pages/NotFound';
import RouteHandler from './components/RouteHandler';
import GlobalContextProvider from './context/providers/GlobalContextProvider';
const customHistory = createBrowserHistory();

const App = () => {
  return (
    <GlobalContextProvider>
      <BrowserRouter history={customHistory}>
        <Routes>
          <Route path=":route/:id" element={<RouteHandler history={customHistory} />} />
          <Route path=":route" element={<RouteHandler history={customHistory} />} />
          <Route path="/" element={<RouteHandler history={customHistory} />} />
          <Route exact path='*' element={<NotFound history={customHistory} />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  );
}

export default App;