import Component from '../utils/Component.js'

export interface InputProps {
    class: string,
    inputName: string,
    placeholder?: string,
    type: string
}

class Input extends Component<InputProps> {
    template():string {
        return '<input class={{class}} name={{inputName}} placeholder={{placeholder}} type={{type}}/>'
    }
}

export default Input
