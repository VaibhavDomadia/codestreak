import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';
import NavigationBar from './Components/NavigationBar/NavigationBar';

const App = (props) => {
    const [user, setUser] = useState(null);

    return (
        <div className='App'>
            <Header user={user} setUser={setUser}/>
            <NavigationBar />
        </div>
    )
}

export default App;
