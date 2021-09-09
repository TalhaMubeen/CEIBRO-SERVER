import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "../components/Auth/Login/Login";
import Projects from '../components/Projects/ProjectList/Project'
import AppLayout from "./AppLayout";


interface Configs {
}

const RouterConfig: React.FC<Configs> = () => {
  return (
    <Router>
        <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
            <AppLayout>
              <Route path="/projects" component={Projects} />
            </AppLayout>
        </Switch>
    </Router>
  );
};

export default RouterConfig;
