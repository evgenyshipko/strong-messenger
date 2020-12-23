import Component from '../../utils/Component'
import { EventData } from '../../types/Types'

interface OptionProps<T> {
    class?: string,
    label: string
    eventData?: EventData,
    value: T
}

class Option<T> extends Component<OptionProps<T>> {
    template(): string {
        return `<option class={{class}} @event={{eventData}} >{{label}}</option>`
    }
}

export default Option
