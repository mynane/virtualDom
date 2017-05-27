import React, { Component } from 'react';

import './image.scss';

const count = 59;
const time = 20;

const Image = (props) => {
    let imgRef;
    let timer;
    let i = 1;
    const handleMouseOver = (e) => {
        clearInterval(timer);

        timer = setInterval(() => {
            i++;
            if (i > count) {
                clearInterval(timer);
                return;
            }
            imgRef.style.backgroundPosition = `0 -${i * 75}px`;
        }, time);
    };

    const handleMouseOut = (e) => {
        clearInterval(timer);

        timer = setInterval(() => {
            i--;
            if (i === 0) {
                clearInterval(timer);
                return;
            }
            imgRef.style.backgroundPosition = `0 -${i * 75}px`;
        }, time);
    };

    return (
        <div className="image" style={{ 'backgroundImage': `url(${props.url})` }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} ref={node => imgRef = node} />
    );
};

export default Image;
