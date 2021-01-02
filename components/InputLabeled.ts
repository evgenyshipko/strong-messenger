import Component from '../utils/component/Component'
import { EventData } from '../types/Types'

export interface InputLabeledProps {
    inputClass: string,
    inputName: string,
    inputId: string,
    labelClass: string,
    labelText: string,
    type: string,
    eventData?: EventData
}

class InputLabeled extends Component<InputLabeledProps> {
    template():string {
        return `<label for={{inputId}} class={{labelClass}}>{{labelText}}</label>
            <input class={{inputClass}} name={{inputName}} type={{type}} id={{inputId}} @event={{eventData}} />`
    }
}

export default InputLabeled
