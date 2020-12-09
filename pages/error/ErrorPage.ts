import Component from '../../utils/Component.js'
import Button from "../../components/Button.js";

interface ErrorPageProps {
    errorNumber: string,
    pageText :string,
    button: Button
}

export class ErrorPage extends Component<ErrorPageProps> {
    template() {
        return `
        <div>
            <div class='error-page'>
                    <h1 class='error-page-header'>{{errorNumber}}</h1>
                    <h1 class='error-page-header'>{{pageText}}</h1>
                    <div>{{button}}</div>
            </div>
        </div>`
    }
}
