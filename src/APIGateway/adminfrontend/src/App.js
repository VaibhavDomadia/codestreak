import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router';
import './App.css';
import Header from './Components/Header/Header';
import NavigationBar from './Components/NavigationBar/NavigationBar';
import Contest from './Pages/Contest/Contest';
import ContestList from './Pages/ContestList/ContestList';
import CreateContest from './Pages/CreateContest/CreateContest';
import EditProblem from './Pages/EditProblem/EditProblem';
import Error403 from './Pages/Error/Error403/Error403';
import Error404 from './Pages/Error/Error404/Error404';
import Error500 from './Pages/Error/Error500/Error500';
import HomePage from './Pages/HomePage/HomePage';
import Login from './Pages/Login/Login';
import Problem from './Pages/Problem/Problem';
import ProblemList from './Pages/ProblemList/ProblemList';
import Proposal from './Pages/Proposal/Proposal';
import ProposalList from './Pages/ProposalList/ProposalList';
import { getUser, isTokenExpired } from './util/authentication';

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
                <Route path='/' exact component={HomePage}/>
                <Route path='/login'>
                    <Login user={user} setUser={setUser}/>
                </Route>
                <Route path='/contest' exact component={ContestList}/>
                <Route path='/contest/:contestID' component={Contest}/>
                <Route path='/create/contest' component={CreateContest}/>
                <Route path='/problem' exact component={ProblemList}/>
                <Route path='/problem/:problemID' exact component={Problem}/>
                <Route path='/edit/problem/:problemID' exact component={EditProblem}/>
                <Route path='/proposal' exact component={ProposalList}/>
                <Route path='/proposal/:proposalID' exact component={Proposal}/>
                <Route path='/403' exact component={Error403}/>
                <Route path='/500' exact component={Error500}/>
                <Route path='*' exact component={Error404}/>
            </Switch>
        </div>
    )
}

export default App;
