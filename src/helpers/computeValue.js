export function computeValue(value, type) {
    if (type === 'sellingPercentage') {
        return `${value} %`
    }

    if (type === 'fixedValue') {
        return `${value} €`
    }

    return "0"
}