import Component from '../utils/Component'
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
    template(): string {
        const entrails: string = (() => {
            const { text, iconClass } = this.props
            return `${iconClass ? '<i class={{iconClass}}></i>' : ''}${text ? '<span>{{text}}</span>' : ''}`
        })()
        return `<button class={{class}} type={{type}} form={{formId}} @event={{eventData}}>${entrails}</button>`
    }
}

export default Button
