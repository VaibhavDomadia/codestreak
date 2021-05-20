import { useState } from 'react';
import './App.css';
import Header from './Components/Header/Header';

const App = (props) => {
    const [user, setUser] = useState(null);

    return (
        <div className='App'>
            <Header user={user} setUser={setUser}/>
        </div>
    )
}

export default App;
