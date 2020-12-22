import Component from '../utils/Component'

export interface InputProps {
    class: string,
    inputName: string,
    placeholder?: string,
    type: string,
    value?: string
}

class Input extends Component<InputProps> {
    template():string {
        return '<input class={{class}} name={{inputName}} placeholder={{placeholder}} type={{type}} value={{value}}/>'
    }
}

export default Input
