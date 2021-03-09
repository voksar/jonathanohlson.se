import React, { useState } from 'react';
import { authFetch } from '../../utils/misc/authFetch';
import './CreateUser.css';

const CreateUser: React.FC = () => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [role, setRole] = useState<string>("");
    const [msg, setMsg] = useState<string>("");


    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        let opts = {
            'username':username,
            'password':password,
            'role':role
        }
        await authFetch('/api/admin/create', 'PUT', opts).then(response => {
            if(!response.ok){ throw response ;}
            return response.json();
        }).then(response => {
            if(response.msg){
                setMsg(response.msg);
            }
        }).catch(e => {
            setMsg(`User could not be created, Error ${e.status}`)
        })
    }

    return (
        <div className="div">
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                      <h2>Create User</h2>
                    </div>
                    <div>
                    {msg !== "" ? <p>{msg}</p>: ""}
                    </div>
                    <form onSubmit={(e) => handleSubmit(e)}>
                      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="fadeIn second"  placeholder="Username"/>
                      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="fadeIn third" placeholder="Password"/>
                      <input type="text" value={role} onChange={(e) => setRole(e.target.value)} className="fadeIn fourth"  placeholder="Role"/>
                      <input type="submit" className="fadeIn fourth" value="Create"/>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;