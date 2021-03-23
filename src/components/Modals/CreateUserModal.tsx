import React, { useState } from 'react';
import { authFetch } from '../../utils/misc/authFetch';

const CreateUserModal: React.FC = () => {
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
                setUsername('');
                setPassword('');
                setRole('');
            }
        }).catch(e => {
            setMsg(`User could not be created, Error ${e.status}`)
        })
    }
    return (
        <>
        </>
    );
}

export default CreateUserModal;