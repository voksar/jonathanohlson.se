import React,{ useEffect, useState } from 'react';
import './LoginForm.css';

import { useLocation, useHistory } from 'react-router-dom';


interface Props {
    handleLogin: (...args : any[]) => any,
    logged: boolean,
    setLogged: any
}

interface LocationState {
    nextPage: string
}

const LoginForm : React.FC<Props> = ({handleLogin, logged, setLogged}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errormsg, setErrormsg] = useState("");
    const [nextPage, setNextPage] = useState("/");
    const [loading, setLoading] = useState(false);
    const location = useLocation<LocationState>();
    const history = useHistory();
    var msg = "";


    useEffect(() => {
        if(logged){
            history.push("/");
        }
        try {
            setNextPage(location.state.nextPage); 
        } catch {
            setNextPage("/");
        }
        return () => {
            setLoading(true);
        }
    }, [])

    
    async function handleSubmit(e : React.FormEvent){
        e.preventDefault();
        const user = {
            username: username,
            password: password,
            setPassword: setPassword,
            setUsername: setUsername
        }
        msg = await handleLogin(e, history, setLogged, user, nextPage);
        setErrormsg(msg);
    }  
    return (
        <>
        {loading ? "" : 
        <div className="div">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                      <h2>Login</h2>
                    </div>
                    <div>
                    {errormsg !== "" ? <p>{errormsg}</p>: ""}
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="fadeIn second"  placeholder="Username"/>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="fadeIn third" placeholder="Password"/>
                      <input type="submit" className="fadeIn fourth" value="Log In"/>
                    </form>
                </div>
            </div>
        </div>
        }
        </>
    );
}
export default LoginForm;