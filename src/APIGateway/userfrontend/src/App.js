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
import ProposalList from './Pages/ProposalList/ProposalList';
import Error500 from './Pages/Error/Error500/Error500';
import Error404 from './Pages/Error/Error404/Error404';
import Proposal from './Pages/Proposal/Proposal';
import Error403 from './Pages/Error/Error403/Error403';
import Contest from './Pages/Contest/Contest';
import Submission from './Pages/Submission/Submission';
import ProblemSubmissions from './Pages/ProblemSubmissions/ProblemSubmissions';

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
                <Route path='/user/:userID' component={Profile}/>
                <Route path='/problem' exact component={ProblemList}/>
                <Route path='/problem/:problemID' component={Problem}/>
                <Route path='/contest' exact component={ContestList}/>
                <Route path='/contest/:contestID' component={Contest}/>
                <Route path='/blog/user/:userID' component={UserBlogs}/>
                <Route path='/blog/:blogID' component={Blog}/>
                <Route path='/blog' exact component={BlogList}/>
                <Route path='/proposal' exact component={ProposalList}/>
                <Route path='/proposal/:proposalID' component={Proposal}/>
                <Route path='/submission/:submissionID' exact component={Submission}/>
                <Route path='/submission/user/:userID' component={UserSubmissions}/>
                <Route path='/submission/problem/:problemID' component={ProblemSubmissions}/>
                <Route path='/403' exact component={Error403}/>
                <Route path='/500' exact component={Error500}/>
                <Route path='*' exact component={Error404}/>
            </Switch>
        </div>
    )
}

export default App;
