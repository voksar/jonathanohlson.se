export async function apiFetch<T> (url:string, method: string, opts?: {}): Promise<T> {
    var token = getCookie('csrf_access_token');
    return fetch(url, {
        method: method,
        body: JSON.stringify(opts),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': token
        },
        credentials: 'include'
    }).then(response => {
        if(!response.ok){
            throw new Error(response.statusText);
        }
        return response.json() as Promise<T>;
    });
}


function getCookie(name:string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)===' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return "100";
}