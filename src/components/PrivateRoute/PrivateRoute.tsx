import { Redirect, Route, RouteComponentProps, useLocation } from "react-router-dom";
import React from "react";

type Props = {
    component: React.ComponentType<RouteComponentProps>,
    path : string,
    exactPath? : boolean,
    authenticated: boolean
}

interface LocationState {
    pathname: string
}

const PrivateRoute: React.FC<Props> = ({
    component: Component,
    path,
    exactPath,
    authenticated
}) => {
    const location = useLocation<LocationState>();

    if(path !== location.pathname && exactPath){
        return <Redirect to="/404"/>
    }
    return <Route exact={exactPath} path={path} render={(props) => (
        authenticated
        ? <Component {...props} />
        : <Redirect to={{pathname : "/login",
    state : {
        nextPage : path
    }}} />
    )} />
}

export default PrivateRoute;