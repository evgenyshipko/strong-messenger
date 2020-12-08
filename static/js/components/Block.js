import Component from '../utils/Component.js';
class Block extends Component {
    constructor(props) {
        super(props);
    }
    template() {
        return `<div class={{class}}>{{content}}</div>`;
    }
}
export default Block;
//# sourceMappingURL=Block.js.map