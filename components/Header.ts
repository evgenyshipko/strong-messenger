import Component from '../utils/Component'

interface HeaderProps {
    class: string,
    text: string,
    level?: '1'|'2'|'3'|'4'|'5'|'6'
}

class Header extends Component<HeaderProps> {
    template(): string {
        const level = this.props.level || '1'
        return `<h${level} class={{class}}>{{text}}</h${level}>`
    }
}

export default Header
