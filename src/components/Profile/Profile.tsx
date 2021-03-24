import { useEffect, useState } from 'react';
import { authFetch } from '../../utils/misc/authFetch';
import { apiFetch } from '../../utils/fetch/apiFetch';

interface Response {
    username: string,
    roles: string,
    id: number
}

const Profile: React.FC = () => {
    const [username, setUsername] = useState("");
    const [, setRoles] = useState("");
    const [, setId] = useState<number>();
    const [loading, setLoading] = useState(true);

    async function loadProfile(){
        await apiFetch<Response>('/api/user/profile', 'GET').then(response => {
            setUsername(response.username);
            setRoles(response.roles);
            setId(response.id);
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