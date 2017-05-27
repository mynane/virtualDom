import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Animate from 'rc-animate';
import warning from 'warning';
import invariant from 'invariant';

import Swipe from './Swipe';

import triggerEvent from './triggerEvent';

class AnimateCom extends Component {
    constructor() {
        super();
        this.state = {
            show: true,
        };
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.container = document.getElementById('container');


        this.container.addEventListener('myEvent', (e) => {
            console.log('我是自定义事件，我被触发了， 嘿嘿！');
        });
    }

    onClick(e) {
        this.setState({
            show: !this.state.show,
        });
        warning(false, 'This thing should be true but you set to false. No soup for you!');
        invariant(false, 'This thing should be true but you set to false. No soup for you!');
        triggerEvent(this.container, 'myEvent');
    }

    render() {
        return (
            <div className="code-box-demo-wrapper">
                <Swipe name="shi jin hua" />
                <p
                    className="buttons"
                    onClick={this.onClick}
                >
                    切换
                </p>
                <Animate
                    transitionName="fade"
                    transitionAppear
                >
                    {
                        this.state.show ?
                            <div key="1" className="code-box-shape" >
                                213123123
                            </div>
                            :
                            null
                    }
                </Animate>
            </div>
        );
    }
}

export default AnimateCom;
