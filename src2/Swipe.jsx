import React, { Component } from 'react';

import noId from './Wrap';
import Image from './Image';
import ServeArea from './ServeArea';

const Swipe = (props) => {
    const { name, hlick } = props;
    let cityC;
    const handleClick = (e) => {
        console.log(cityC.style.background = 'red');
    };

    return (
        <div
            onClick={handleClick}
            ref={node => cityC = node}
        >
            <span>{name}</span>
            <Image url={'../images/1.jpg'} />
            <Image url={'../images/2.jpg'} />
            <Image url={'../images/3.jpg'} />
            <Image url={'../images/4.jpg'} />
            <Image url={'../images/5.jpg'} />
            <Image url={'../images/6.jpg'} />
            <ServeArea />
        </div>
    );
};

export default noId()(Swipe);
