import Component from './Component.js'
import { Context } from '../types/Types'
/* global HTMLElement */

export default function renderDom(block: Component<Context>): void {
    const root = document.createElement('div')
    const content = block.getContent()
    if (root !== null && content !== null) {
        content.forEach((node) => {
            if (node) {
                root.appendChild(node)
            }
        })
    }
    document.body.appendChild(root)
}
