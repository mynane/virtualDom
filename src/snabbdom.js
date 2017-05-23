// 加载snabbdom
import { init } from 'snabbdom';
// 是切换类变得更容易
import classModule from 'snabbdom/modules/class';
// 设置dom元素属性
import propsModule from 'snabbdom/modules/props';
// 处理style，支持动画
import styleModule from 'snabbdom/modules/style';
// 监听事件
import eventListenersModule from 'snabbdom/modules/eventlisteners';
// 创建虚拟dom node
import h from 'snabbdom/h';

// 初始化补丁功能
const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

/* eslint-disable no-undef */
const container = document.getElementById('container');
/* eslint-enable no-undef */

function someFn() {
    console.log(123213);
}

function anotherEventHandler() {
    console.log(21321);
}


const vnode = h('div#container.two.classes', { on: { click: someFn }, key: '123' }, [
    h('span', { style: { fontWeight: 'bold' } }, 'This is bold'),
    ' and this is just normal text',
    h('a', { props: { href: '/foo' } }, 'I\'ll take you places!'),
]);

console.log(vnode);

patch(container, vnode);

const newVnode = h('div#container.two.classes', { on: { click: anotherEventHandler } }, [
    h('span', { style: { fontWeight: 'normal', fontStyle: 'italic' } }, 'This is now italic type'),
    ' and this is still just normal text',
    h('a', { props: { href: '/bar' } }, 'I\'ll take you places!'),
]);

setTimeout(() => {
    patch(vnode, newVnode);
}, 10000);
