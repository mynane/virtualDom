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
                    当前时间：
                    <div class='clock-wrap-time'>
                        <span class='clock-wrap-h'>{{hours}}:</span>
                        <span class='clock-wrap-m'>{{minute}}:</span>
                        <span class='clock-wrap-s'>{{second}}</span>
                        {{if admin}}
                            <ul>
                                {{each list}}
                                    <li key={{$index}}>{{$index}}. {{$value.user}} - {{$value.name}}</li>
                                {{/each}}
                            </ul>
                        {{/if}}
                    </div>
                </div>`,
    data: {
        hours: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds(),
        admin: true,
    },
    event: {
        handleClick: handleClick,
    },
    lifeCycle: {
        didMount: function () {
            const { second } = this.state;
            this.setState({
                list: [{ user: 1, name: 'shi jinhua' }, { user: 2, name: 'wang jian' }, { user: 3, name: 'liu qiang' }, { user: 4, name: 'shen me' }],
            });
        },
    },
});

console.log(dom);

