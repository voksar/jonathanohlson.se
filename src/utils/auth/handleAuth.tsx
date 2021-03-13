import React from "react";

interface User {
    username: string,
    password: string,
    setPassword: any,
    setUsername: any
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
    }).then(response => {
        setLogged(false);
    }).catch(e => {
        console.log(e);
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
    const data = await fetch('/api/auth/login', fetchOptions).then(response => {
        if(!response.ok){
            throw response;
        }
        return response.json();
    }).then(response => {
        if(response.msg){
            user.setUsername("");
            user.setPassword("");
            setLogged(true);
            history.push(nextPage);
        }
        
    }).catch(e => {
        
        if(e.statusText === "UNAUTHORIZED"){
            return "Wrong username or password";
        }
    });
    return data;
}