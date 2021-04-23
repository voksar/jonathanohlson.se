import { SyncLoader as Loader } from 'react-spinners';
import { useState } from 'react';



const SyncLoader: React.FC = () => {
    //Static vars
    const [color, ] = useState<string>("#1976d2");
    const [size, ] = useState<number>(15);
    const [margin, ] = useState<number>(2);


    return (
        <Loader size={size} margin={margin} color={color}/>
    );
}

export default SyncLoader;