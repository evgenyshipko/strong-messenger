// import Templator from '../Templator.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js'
import TextNodeParser from '../TextNodeParser.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js.js';
// const TEMPLATE = `
//     <div>
//         <div>
//             <a>arrr</a>
//         </div>
//         <input class={{class1}} name={{deeee}} placeholder={{rightNow}}>cd</input>
//         <button class={{class2}}>ded</button>
//     </div>
//     <div class={{hello}}>{{last}}</div>
//     <button class={{class4}}>{{privet}}</button>`
//
// const element = document.createElement('form')
// element.classList.add('zzzzbzbzbzbzb')
//
// const context = {
//     class1: 'ccdd',
//     class2: 'ded',
//     hello: 'hello world',
//     class4: 'pi',
//     deeee: 'one',
//     rightNow: 'rrrrrightNow',
//     privet: 'saaaaaaaaaaay',
//     last: [element]
// }
//
// const templator = new Templator(TEMPLATE)
// const nodeList = templator.compile(context)
// console.log(nodeList)
//
// nodeList.forEach((node) => {
//     document.body.appendChild(node)
// })
const template = `
                <div class="form-item-block-validated">
                    <input class={{class}} name={{inputName}} placeholder={{placeholder}} type={{type}} />
                </div>`;
console.log(new TextNodeParser(template).findAllTextNodes());
//# sourceMappingURL=Executor.js.map