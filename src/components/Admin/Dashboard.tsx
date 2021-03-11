import { useState, useEffect } from 'react';
import { authFetch } from '../../utils/misc/authFetch';


const Dashboard : React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [users, setUsers] = useState<[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    
    async function get_dashboard(){
        await authFetch('/api/admin/dashboard', 'GET').then(response => {
            if(!response.ok){
                throw response;
            }
            return response.json();
        }).then(response => {
            if(response.users){
                setUsers(response.users);
            }
            if(response.count){
                setCount(response.count);
            }
        }).catch(error => console.log(error));

        setLoading(false);
    }

    useEffect(() => {
        get_dashboard();
    }, []);

    return (
        <div>
            {!loading ? <h1>{count}</h1> : ""}

        </div>
    );
}

export default Dashboard;