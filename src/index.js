import Vue from './Vue';
import './index.scss';

function handleClick(e) {
    const { second, admin } = this.state;
    this.setState({
        admin: !admin,
    });
}

const dom = new Vue({
    el: 'container',
    template: `<div class='clock-wrap' onclick='handleClick'>
                    <div class='clock-wrap-time'>
                        当前时间：
                        <span class='clock-wrap-h'>{{hours}}:</span>
                        <span class='clock-wrap-m'>{{minute}}:</span>
                        <span class='clock-wrap-s'>{{second}}</span>
                        {{if admin}}
                            <ul>
                                {{each list}}
                                    <li key={{$index}}>{{$index}}. {{$value.user}}</li>
                                {{/each}}
                            </ul>
                        {{/if}}
                    </div>
                </div>`,
    data: {
        hours: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds(),
        admin: false,
    },
    event: {
        handleClick: handleClick,
    },
    lifeCycle: {
        didMount: function () {
            const { second } = this.state;
            this.setState({
                list: [{ user: 1 }, { user: 2 }, { user: 3 }, { user: 4 }],
            });
        },
    },
});

