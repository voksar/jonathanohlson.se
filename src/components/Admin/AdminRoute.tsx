import { Redirect, Route, RouteComponentProps, useLocation } from "react-router-dom";
import React from "react";

type Props = {
    component: React.ComponentType<RouteComponentProps>,
    path : string,
    exactPath? : boolean,
    isAdmin: boolean
}

interface LocationState {
    pathname: string
}

const AdminRoute: React.FC<Props> = ({
    component: Component,
    path,
    exactPath,
    isAdmin
}) => {
    const location = useLocation<LocationState>();

    if(path !== location.pathname && exactPath){
        return <Redirect to="/404"/>
    }
    return <Route exact={exactPath} path={path} render={(props) => (
        isAdmin
        ? <Component {...props} />
        : <Redirect to={{pathname : "/",
    state : {
        message: 'Not allowed'
    }}} />
    )} />
}

export default AdminRoute;