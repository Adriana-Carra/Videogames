import { Route } from "react-router-dom";
import Home from './views/HomePage/home';
import Detail from './views/Detail/detail';
import Create from './views/Create-card/create';
import Landing from './views/Landing/landing.jsx';

import './App.css';

function App() {
  return (
    <div className="App">
        <Route exact path='/' component={Landing} />
        <Route exact path="/games" component={Home} />
        <Route path="/games/:id" component={Detail} />
        <Route path="/create" component={Create} />
    </div>
    
  );
}

export default App;
