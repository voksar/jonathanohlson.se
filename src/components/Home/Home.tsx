import React,{ useState } from 'react';

const Home : React.FC = () => {
    const [username, setUsername] = useState<string>("-");
    return (
        <h1>
            {username}
        </h1>
    );
}
export default Home;