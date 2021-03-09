export async function checkAuth() : Promise<any> {
    const fetchOptions = {
        method: 'get',
        withCredentials: 'include'
    };
    const value = await fetch('/api/auth/valid', fetchOptions).then(response => {
        if(!response.ok){
            throw response;
        }
        return response.json();
    }).then(response => {
        
        if(response.msg){
            return true;
        }
        else {
            return false;
        }
    }).catch(e => {
        return false;
    });

    return value;
}