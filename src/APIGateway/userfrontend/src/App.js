import logo from './logo.svg';
import './App.css';
import Header from './Components/Header/Header';
import NavigationBar from './Components/NavigationBar/NavigationBar';

const App = (props) => {
    return (
        <div>
            <Header />
            <NavigationBar />
        </div>
    )
}

export default App;
