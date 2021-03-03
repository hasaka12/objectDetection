import React, { useState } from 'react';

import Header from './Header';
import Content from "./Content";

const mystyle = {
    container: {
        margin: '2%'
    },
    subContainer: {
        marginBottom: '10px'
    }
  };

const ObjectDetection = () => { 
    const [isCamOn, setIsCamOn] = useState(false);

    const handleToggleCamera = () => {
        setIsCamOn(!isCamOn);
    }

    return(
    <div style={mystyle.container}>
        <div style={mystyle.subContainer}>
            <Header handleToggleCamera={handleToggleCamera} isCamOn={isCamOn} />
        </div>
        {isCamOn && <div style={mystyle.subContainer}>
            <Content handleToggleCamera={handleToggleCamera} isCamOn={isCamOn} />
        </div>}
    </div>
    );
}
export default ObjectDetection;
