import Component from './Component.js'
import { Context } from '../types/Types'

export class ErrorPage extends Component {
    constructor(props: Context) {
        super(props)
    }

    template() {
        return `
        <div>
            <div class={{rootClass}}>
                    <h1 class={{headerClass}}>{{errorNumber}}</h1>
                    <h1 class={{headerClass}}>{{pageText}}</h1>
                    <div>{{button}}</div>
            </div>
        </div>`
    }
}
