import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Home from "../views/Home";
import Results from "../views/Results";
import Biography from "../views/Biography";
import Login from "../views/Login";

export default function Routes() {
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <Route path="/search" component={Home} />
      <Route path="/results/:searchText" component={Results} />
      <Route path="/bio/:id" component={Biography} />
    </Router>
  );
}