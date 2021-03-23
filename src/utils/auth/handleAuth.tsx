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
    const fetchOptions = {
        method: 'GET',
        withCredentials: 'include'
    };
    await fetch('/api/auth/logout', fetchOptions).then(response => {
        if(!response.ok){
            throw response;
        }
        return response.json();
    }).then(() => {
        setLogged(false);
    }).catch(e => {
    })
    history.push("/");
}

export async function handleLogin(e: React.FormEvent, history: any, setLogged: any,user: User, nextPage: string, setErrormsg?: any) {
    let opts = {
        'username':user.username,
        'password':user.password
    }
    const fetchOptions = {
        method: 'post',
        body: JSON.stringify(opts),
        withCredentials: 'include'
    };
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