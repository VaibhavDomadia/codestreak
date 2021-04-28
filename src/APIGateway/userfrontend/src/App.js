import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Header from './Components/Header/Header';
import NavigationBar from './Components/NavigationBar/NavigationBar';

import ContestList from './Pages/ContestList/ContestList';

const App = (props) => {
    return (
        <div>
            <Header />
            <NavigationBar />
            <Switch>
                <Route path='/contest' component={ContestList}/>
            </Switch>
        </div>
    )
}

export default App;
