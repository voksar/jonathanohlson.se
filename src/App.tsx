import React, { useEffect, useState } from 'react';
import './App.css';

import { checkAuth } from './utils/auth/checkAuth';
import { authFetch } from './utils/misc/authFetch';
import { handleLogout, handleLogin } from './utils/auth/handleAuth';

//Components
import LoginForm from './components/LoginForm/LoginForm';
import Home from './components/Home/Home';
import NavigationBar from './components/NavComponent/NavigationBar';
import Profile from './components/Profile/Profile';
import TaskHeader from './components/Tasks/TaskHeader';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import AdminRoute from './components/Admin/AdminRoute';
import Dashboard from './components/Admin/Dashboard';
import CreateUser from './components/Admin/CreateUser';

import { BrowserRouter as Router , Switch, Route } from 'react-router-dom';



function App() {
  const [logged, setLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminAuth, setAdminAuth] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetch_data(){
      var value = await checkAuth();
      await setLogged(value);
      if(logged){
        var data = await authFetch('/api/auth/admin', 'GET').then(response => {
          if(!response.ok){
            throw response;
          }
          return response.json();
        }).then(response => {
          if(response.admin){
            return response.admin;
          }

        }).catch(e => console.log(e));
        setAdminAuth(data);
      }
      setLoading(false);
    }

    fetch_data();
    
  }, [logged]);
  return (
    <div className="App">
      {loading ? "" : 
      <header className="App-header">
        <Router>
          <NavigationBar handleLogout={handleLogout} logged={logged} setLogged={setLogged} isAdmin={adminAuth} />
          <Switch>
            {/*Normal routes, no authentication needed*/}
            <Route exact path="/" component={Home} />
            <Route exact path="/login" render={() => (
              <LoginForm logged={logged} handleLogin={handleLogin} setLogged={setLogged}/>
              )}/>

            {/*Logged in routes*/}
            <PrivateRoute exactPath path="/profile" component={Profile} authenticated={logged}/>
            <PrivateRoute exactPath path="/tasks" component={TaskHeader} authenticated={logged} /> 

            {/*Admin routes, admin authentication required*/}
            <AdminRoute exactPath path="/admin/Dashboard" component={Dashboard} isAdmin={adminAuth} />
            <AdminRoute exactPath path="/admin/create" component={CreateUser} isAdmin={adminAuth} />
          </Switch>
        </Router>
      </header>}
    </div>
  );
}

export default App;
