import React, { Suspense, lazy } from 'react'
import {Provider} from "react-redux";
import { Router, Switch, Route } from "react-router-dom";
import { Spinner } from "components/common";
import { withAuthorizationPermissions } from 'modules/Auth/hocs'
import { history } from "utils";
import Root from "./Root";
import configureStore from "./store";

const store = configureStore();

const LoginPage = lazy(() => import("modules/Auth/pages/LoginPage"));

function App() {
    return (
        <Provider store={store}>
            <Router history={history}>
                <Suspense fallback={<Spinner />}>
                    <Switch>
                        <Route
                            exact
                            path="/login"
                            component={withAuthorizationPermissions(LoginPage)}
                        />
                        <Route path="/" component={Root} />
                    </Switch>
                </Suspense>
            </Router>
        </Provider>
    )
}

export default App;
