import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Header from './Components/Header/Header';
import NavigationBar from './Components/NavigationBar/NavigationBar';

import ContestList from './Pages/ContestList/ContestList';
import ProblemList from './Pages/ProblemList/ProblemList';
import Problem from './Pages/Problem/Problem';

const App = (props) => {
    return (
        <div>
            <Header />
            <NavigationBar />
            <Switch>
                <Route path='/contest' component={ContestList}/>
                <Route path='/problem' exact component={ProblemList}/>
                <Route path='/problem/:problemID' component={Problem}/>
            </Switch>
        </div>
    )
}

export default App;
