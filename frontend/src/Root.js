import React, { useEffect, Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthorizationUtils } from "utils";
import { Spinner } from "components/common";

const MainPage = lazy(() => import("modules/Main/pages/MainPage"));

const Root = () => {
    useEffect(() => {
        const token = AuthorizationUtils.getSessionToken();
        if (token) {
            // Prepare required data
        } else {
            AuthorizationUtils.redirectToLoginForm();
        }
    });
    return (
        <Suspense fallback={<Spinner />}>
            <Switch>
                <Route exact path="/main" component={MainPage} />
                <Redirect path="*" to="/main" />
            </Switch>
        </Suspense>
    );
};

export default Root
