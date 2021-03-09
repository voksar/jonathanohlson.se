import { useEffect, useState } from 'react';
import { authFetch } from '../../utils/misc/authFetch';

const Profile: React.FC = () => {
    const [username, setUsername] = useState("");
    const [roles, setRoles] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        authFetch('/api/user/profile', 'get').then(response => {
            if(!response.ok){
                throw response;
            }
            return response.json();
        }).then(response => {
            setUsername(response.username);
            setRoles(response.roles);
            setId(response.id);
        }).catch(error => {
            console.log(error);
        })
    }, []);

    return(
        <>
            <h1>{username}</h1>
            <h1>{id}</h1>
            <h1>{roles}</h1>
        </>
    );
}

export default Profile;