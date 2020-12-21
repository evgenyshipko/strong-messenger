
export const queryStringify = (data: Record<string, unknown>) => {
    let index = 0
    return Object.keys(data).reduce((acc, key) => {
        acc = acc + `${key}=${data[key]}`
        if (index !== Object.keys(data).length - 1) {
            acc = acc + '&'
        }
        index++
        return acc
    }, '?')
}
