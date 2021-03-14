import { useEffect, useState } from 'react';
import { authFetch } from '../../utils/misc/authFetch';

const Profile: React.FC = () => {
    const [username, setUsername] = useState("");
    const [, setRoles] = useState("");
    const [, setId] = useState("");
    const [loading, setLoading] = useState(true);

    async function loadProfile(){
        await authFetch('/api/user/profile', 'get').then(response => {
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
        });
        setLoading(false);
    }
    useEffect(() => {
        loadProfile();
    }, []);

    return(
        <>
        {loading ? "" :
            <h1>{username}</h1>
        }
        </>
    );
}

export default Profile;