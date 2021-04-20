import { Switch, Route } from "react-router-dom";
import "./App.css";
import Entry from "./Components/Entry";
import Home from "./Components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Entry} />
        <Route exact path="/home" component={Home} />
      </Switch>
    </>
  );
}

export default App;
