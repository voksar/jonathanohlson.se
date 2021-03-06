import { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/fetch/apiFetch';

import SyncLoader from '../Loader/SyncLoader';

interface Response {
    username: string,
    role: string,
    id: number
}

function sleep(ms : any) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const Profile: React.FC = () => {
    const [username, setUsername] = useState("");
    const [, setRole] = useState("");
    const [, setId] = useState<number>();
    const [loading, setLoading] = useState(true);


    async function loadProfile(){
        await apiFetch<Response>('/api/user/profile', 'GET').then(response => {
            setUsername(response.username);
            setRole(response.role);
            setId(response.id);
        });
        await sleep(5000);
        setLoading(false);
    }
    useEffect(() => {
        loadProfile();
    }, []);

    return(
        <>
        {loading ? <SyncLoader /> :
            <h1>{username}</h1>
        }
        </>
    );
}

export default Profile;