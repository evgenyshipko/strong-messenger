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
export function render(query, blockArr) {
    const root = document.querySelector(query);
    blockArr.forEach((block) => {
        const content = block.getContent();
        if (root !== null && content !== null) {
            content.forEach((node) => {
                if (node) {
                    root.appendChild(node);
                }
            });
            document.body.appendChild(root);
        }
    });
}
//# sourceMappingURL=renderDom.js.map