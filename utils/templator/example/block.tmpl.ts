import {CHAT_ITEM_TEMPLATE} from "./chats_element.tmpl.js";

export const SIMPLE_TEMPLATE = `
    <div onClick="{{handleClick}}">
        {{ field1 }}
        <span>{{field2}}</span>
        <span>{{ field3.info.name }}</span>
        <ul>{{items}}</ul>
    </div>`

export const SIMPLE_CONTEXT = {
    field1: 'Text 1',
    field2: 42,
    field3: {
        info: {
            name: 'Simon',
        },
    },
    handleClick: () => {
        console.log(document.body);
    },
    items:[1, 2, 3, 4].map(item => new Templator(arrayItemTempl).compile({ name: item })).join("\n\t")
};
