import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import './sass/App.scss';
import store from "./redux/store";
import {Provider} from "react-redux";
import Landing from "./pages/Landing";
import ViewDetails from "./pages/ViewDetails";
import PersistCart from "./components/PersistCart";

function App() {
  return (
      <Provider store={store}>
          <PersistCart/>
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route path={"/view/:type/:category/:id"} component={ViewDetails} />
          </Switch>
        </Router>
      </Provider>
  );
}

export default App;
