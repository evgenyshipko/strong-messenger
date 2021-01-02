import Component from '../utils/component/Component'
import { EventData } from '../types/Types'

export interface InputProps {
    class: string,
    inputName: string,
    placeholder?: string,
    type: string,
    value?: string
    eventData?: EventData
}

class Input extends Component<InputProps> {
    template():string {
        return '<input class={{class}} name={{inputName}} placeholder={{placeholder}} type={{type}} value={{value}} @event={{eventData}}/>'
    }
}

export default Input
