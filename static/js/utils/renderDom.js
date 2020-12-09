/* global HTMLElement */
export default function renderDom(block) {
    const root = document.createElement('div');
    const content = block.getContent();
    if (root !== null && content !== null) {
        content.forEach((node) => {
            if (node) {
                root.appendChild(node);
            }
        });
    }
    document.body.appendChild(root);
}
//# sourceMappingURL=renderDom.js.map