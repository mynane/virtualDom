/**
 * @file html2hscript.js
 * @author huazaierli
 *
 * 将html转化为hscript
 */

import { Parser } from 'htmlparser2';
import camel from 'to-camel-case';
import ent from 'ent';
import isEmpty from 'is-empty';
import { thisIsSVGTag, getSVGNamespace, getSVGAttributeNamespace } from 'html2hscript/lib/svg-namespaces';
import h from 'snabbdom/h';

let elementStack = [];

class ItemList {
    constructor(parent) {
        this.parent = parent;
        this.content = [];
        this.isFirstItem = true;
    }

    add(data, ignoreComma) {
        if (!ignoreComma) {
            this.isFirstItem = false;
        }

        this.content.push(data);
    }
}

export default function (html, cb, events, that) {
    let currentItemList = new ItemList(null);

    const parser = new Parser({
        onopentag: function (name, attribs) {
            currentItemList = new ItemList(currentItemList);
            elementStack.unshift([name, attribs]);
        },
        ontext: function (text) {
            currentItemList.add(ent.decode(text));
        },
        onclosetag: function (tagname) {
            const element = elementStack.shift();

            const elementContent = currentItemList.content;

            currentItemList = currentItemList.parent;

            const attribs = element[1];

            const id = attribs.id;

            const idSuffix = (id !== undefined ? `#${id}` : '');
            delete attribs.id;

            const classNames = attribs.class;
            let classSuffix;
            if (!thisIsSVGTag(element[0])) {
                classSuffix = (classNames !== undefined ? classNames : '').split(/\s+/g).filter((v) => {
                    return v.length > 0;
                }).map((cls) => {
                    return `.${cls}`;
                }).join('');
                delete attribs.class;
            } else {
                classSuffix = '';
            }

            if (attribs.style) {
                const rules = attribs.style.split(';');
                attribs.style = {};
                rules.forEach((rule) => {
                    const split = rule.split(':');
                    if (split.length === 2) {
                        attribs.style[split[0].trim()] = split[1].trim();
                    }
                });
            }

            const style = attribs.style;
            delete attribs.style;

            let dataset = {};
            let datasetkey;
            let onset = {};
            let onsetkey;

            Object.keys(attribs).forEach((k) => {
                if (k.slice(0, 5) === 'data-') {
                    datasetKey = camel(k.slice(5));
                    dataset[datasetKey] = attribs[k];
                    delete attribs[k];
                } else if (k.slice(0, 2) === 'on') {
                    onsetkey = camel(k.slice(2));
                    onset[onsetkey] = events[attribs[k]].bind(that);
                    delete attribs[k];
                }
            });

            let objects = {};
            if (attribs.value) {
                objects.value = attribs.value;
                delete attribs.value;
            }

            if (attribs.key) {
                objects.key = attribs.key;
                delete attribs.key;
            }

            if (!isEmpty(style)) objects.style = style;
            if (!isEmpty(attribs)) objects.attributes = attribs;
            if (!isEmpty(onset)) objects.on = onset;
            if (!isEmpty(dataset)) objects.dataset = dataset;
            const objectStr = !isEmpty(objects) ? objects : '';
            const firstItem = elementContent[0];
            let item;
            if (elementContent.length === 1 && typeof firstItem === 'string') {
                item = h(element[0] + idSuffix + classSuffix, objectStr, firstItem);
            } else {
                item = h(element[0] + idSuffix + classSuffix, objectStr, elementContent);
            }

            currentItemList.add(item);
        },
        onend: function () {
            cb(null, currentItemList.content[0]);
        },
    }, { decodeEntities: true, xmlMode: true });

    parser.write(html);

    parser.end();
}
