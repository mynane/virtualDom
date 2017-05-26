import React, { Component } from 'react';

import noId from './Wrap';

const Swipe = (props) => {
    const { name, hlick } = props;
    let cityC;
    const handleClick = (e) => {
        console.log(cityC.style.background = 'red');
    };

    return (
        <div onClick={handleClick} ref={node => cityC = node}>{name}</div>
    );
};

export default noId()(Swipe);
