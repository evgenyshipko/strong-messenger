/* global HTMLElement */
export default function renderDom(block) {
    // console.log('======= renderDom ======')
    const root = document.createElement('div');
    const content = block.getContent();
    // console.log('render', content)
    if (root != null && content != null) {
        content.forEach((node) => {
            if (node) {
                root.appendChild(node);
            }
        });
    }
    document.body.appendChild(root);
}
//# sourceMappingURL=renderDom.js.map