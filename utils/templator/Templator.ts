
class Templator {
    _template: string

    constructor(template: string) {
        this._template = template
    }

    compile(context: any) {
        return this._compileTemplate(this._template, context)
    }

    getData(obj: any, path: string, defaultValue: any) {
        const keys = path.split('.')
        let result = obj
        for (const key of keys) {
            result = result[key]
            if (result === undefined) {
                return defaultValue
            }
        }
        return result ?? defaultValue
    }

    replace(key: any, value: any, template: string) {
        template = template.replace('{{' + key + '}}', value)
        return template
    }

    _compileTemplate(template: string, context: any) {
        Object.keys(context).forEach((key) => {
            const data = this.getData(context, key, undefined)
            if (typeof data === 'function') {
                // window[key] = data
                template = this.replace(key, 'window.' + key + '()', template)
            } else {
                template = this.replace(key, data, template)
            }
        })
        return template
    }
}

export default Templator
