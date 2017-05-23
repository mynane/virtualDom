import Template from 'art-template/lib/template-web';
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

import html2hscript from './html2hscript';


// 初始化补丁功能
const patch = init([classModule, propsModule, styleModule, eventListenersModule]);

function loop() {}

class Vue {
    constructor(options) {
        this.config = options;
        this.vnode = '';
        this.state = {};
        this.init();
    }

    init() {
        const { el, template, data, event, lifeCycle = {} } = this.config;
        const node = document.getElementById(el);
        const { willMount = loop, didMount = loop } = lifeCycle;
        this.state = data;
        willMount.call(this);
        html2hscript(Template.render(template, this.state), (err, result) => {
            this.vnode = result;
            patch(node, result);
            didMount.call(this);
        }, event, this);
    }

    diff() {
        const { template, event, lifeCycle } = this.config;
        const { willUpdate = loop, didUpdate = loop } = lifeCycle;
        willUpdate.call(this);
        html2hscript(Template.render(template, this.state), (err, result) => {
            patch(this.vnode, result);
            this.vnode = result;
            didUpdate.call(this);
        }, event, this);
    }

    setState(obj) {
        Object.assign(this.state, obj);
        this.diff();
    }
}

export default Vue;
