import Component from '../../utils/component/Component'
import Option from './Option'
import { EventData } from '../../types/Types'

interface DropdownInputProps<T> {
    id: string,
    class: string,
    name: string,
    type: string,
    options: Option<T>[],
    eventData?: EventData,
    value?: string
    autocomplete?: string
}

class DropdownInput<T> extends Component<DropdownInputProps<T>> {
    template(): string {
        return `<input autocomplete={{autocomplete}} class={{class}} type={{type}} name={{name}} list={{id}} value={{value}} @event={{eventData}}/>
                <datalist id={{id}}>{{options}}</datalist>`
    }
}

export default DropdownInput
