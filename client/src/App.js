import { Landing, Home, Detail, Form } from './views';
import { Route, useLocation } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar';


function App() {
  //Hook que me permite ver por donde me muevo, y el pathname me muestra por donde estoy parado.
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}

      <Route exact path='/' render={() => <Landing />} />
      <Route exact path='/home' render={() => <Home />} />
      <Route exact path='/create' render={() => <Form />} />
      <Route exact path='/detail/:id' render={() => <Detail />} />


    </div>
  );
}

export default App;
