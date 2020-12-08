import Component from '../utils/Component.js'
import { EventData } from '../types/Types'

/* global HTMLElement*/

interface ButtonProps {
    class: string,
    text?: string,
    iconClass?: string,
    type?: 'button' | 'reset' | 'submit',
    formId?: string,
    eventData?: EventData
}

class Button extends Component<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props)
    }

    template(): string {
        const entrails: string = (() => {
            if (this.props.text && this.props.iconClass) {
                return `<i class={{iconClass}}></i>
                        <span>{{text}}</span>`
            } else if (this.props.iconClass) {
                return '<i class={{iconClass}}></i>'
            } else if (this.props.text) {
                return '{{text}}'
            } else {
                return ''
            }
        }
        )()
        return `<button class={{class}} type={{type}} form={{formId}} @event={{eventData}}>${entrails}</button>`
    }
}

export default Button
