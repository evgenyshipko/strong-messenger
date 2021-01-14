import Component from '../../../utils/component/Component'
import Button from '../../button/Button'
import './ErrorPage.less'

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
