import React from 'react';

interface Props {
    text: string,
    onClick: () => any,
}

const Button : React.FC<Props> = ({ text, onClick }) => {


    return <button className='btn' onClick={onClick}>{text}</button>
}

export default Button