import './App.css';
import { Switch, Route } from 'react-router-dom';

import Header from './Components/Header/Header';
import NavigationBar from './Components/NavigationBar/NavigationBar';

import ContestList from './Pages/ContestList/ContestList';
import ProblemList from './Pages/ProblemList/ProblemList';
import Problem from './Pages/Problem/Problem';
import Login from './Pages/Login/Login';
import { useEffect, useState } from 'react';
import { getUser, isTokenExpired } from './util/authentication';
import Profile from './Pages/Profile/Profile';
import UserSubmissions from './Pages/UserSubmissions/UserSubmissions';
import UserBlogs from './Pages/UserBlogs/UserBlogs';
import Blog from './Pages/Blog/Blog';
import BlogList from './Pages/BlogList/BlogList';

const App = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token) {
            if(isTokenExpired(token)) {
                localStorage.removeItem('token');
                setUser(null);
            }
            else {
                if(!user) {
                    setUser(getUser(token));
                }
            }
        }
    }, [user]);

    return (
        <div className='App'>
            <Header user={user} setUser={setUser}/>
            <NavigationBar />
            <Switch>
                <Route path='/login'>
                    <Login user={user} setUser={setUser}/>
                </Route>
                <Route path='/contest' component={ContestList}/>
                <Route path='/problem' exact component={ProblemList}/>
                <Route path='/problem/:problemID' component={Problem}/>
                <Route path='/user/:userID' component={Profile}/>
                <Route path='/submission/user/:userID' component={UserSubmissions}/>
                <Route path='/blog/user/:userID' component={UserBlogs}/>
                <Route path='/blog/:blogID' component={Blog}/>
                <Route path='/blog' exact component={BlogList}/>
            </Switch>
        </div>
    )
}

export default App;
