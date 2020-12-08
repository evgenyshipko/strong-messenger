import Component from '../../utils/Component.js';
export class ErrorPage extends Component {
    constructor(props) {
        super(props);
    }
    template() {
        return `
        <div>
            <div class='error-page'>
                    <h1 class='error-page-header'>{{errorNumber}}</h1>
                    <h1 class='error-page-header'>{{pageText}}</h1>
                    <div>{{button}}</div>
            </div>
        </div>`;
    }
}
//# sourceMappingURL=ErrorPage.js.map