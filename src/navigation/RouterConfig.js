import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Login from "../components/Auth/Login/Login";
import AppLayout from "./AppLayout";

const RouterConfig = () => {
  return (
    <Router>
        <Switch>
            <Redirect exact from="/" to="/login" />
            <Route path="/login" component={Login} />
            <AppLayout>
            </AppLayout>
        </Switch>
    </Router>
  );
};

export default RouterConfig;
