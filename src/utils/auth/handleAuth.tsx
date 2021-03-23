import React from "react";
import { apiFetch } from '../fetch/apiFetch';

interface User {
    username: string,
    password: string,
    setPassword: any,
    setUsername: any
}

interface Response {
    msg: string
}

export async function handleLogout(e : React.FormEvent, history: any, setLogged: any){
    e.preventDefault();
    await apiFetch('/api/auth/logout', 'GET').then(() => {
        setLogged(false);
    }).catch(e => {
        console.log(e);
        setLogged(false);
    })
    history.push("/");
}

export async function handleLogin(e: React.FormEvent, history: any, setLogged: any,user: User, nextPage: string, setErrormsg?: any) {
    let opts = {
        'username':user.username,
        'password':user.password
    }   
    const data = apiFetch<Response>('/api/auth/login', 'POST', opts).then(resp => {
        if(resp.msg){
            user.setUsername("");
            user.setPassword("");
            setLogged(true);
            history.push(nextPage);
        }
    }).catch(e => {
        return e.message;
    })
    return data;
}