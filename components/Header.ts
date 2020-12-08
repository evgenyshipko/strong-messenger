import Component from '../utils/Component.js'

interface HeaderProps {
    class: string,
    text: string,
    level?: '1'|'2'|'3'|'4'|'5'|'6'
}

class Header extends Component<HeaderProps> {
    constructor(props: HeaderProps) {
        super(props)
    }

    template(): string {
        let level = this.props.level
        if (!level){
            level = '1'
        }
        return `<h${level} class={{class}}>{{text}}</h${level}>`
    }
}

export default Header
