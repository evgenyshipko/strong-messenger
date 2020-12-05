import Component from '../Component.js'
/* global HTMLElement */

export function renderBody(block: Component): void {
    console.log('======= renderBody ======')
    const root = document.createElement('div')
    const content = block.getContent()
    console.log('renderBody', content)
    // if (content != null){
    //     console.log('renderBody content', content[0].outerHTML)
    // }
    if (root != null && content != null) {
        content.forEach((node) => {
            root.appendChild(node)
        })
    }
    document.body.appendChild(root)
}
