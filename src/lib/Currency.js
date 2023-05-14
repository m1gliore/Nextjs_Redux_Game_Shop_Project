export const convertCurrency = (currency, price) => {
    switch (currency) {
        case "USD":
            return `$${(price / 75).toFixed(2)}`
        case "EUR":
            return `€${(price / 82).toFixed(2)}`
        default:
            return `${price.toFixed(2)}₽`
    }
}

export const convertToNumber = (value) => {
    const parsedValue = parseFloat(value.replace(/[^\d.-]/g, ''))
    return Number(parsedValue.toFixed(2))
}

export const currencySign = (currency, price) => {
    switch (currency) {
        case "USD":
            return `$${price.toFixed(2)}`
        case "EUR":
            return `€${price.toFixed(2)}`
        default:
            return `${price}₽`
    }
}
