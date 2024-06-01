const sanitize = (data: any) => {
    Object.keys(data).forEach(key => {
        const value = data[key]

        if (value instanceof File) return

        if (value instanceof Date) {
            data[key] = value.toISOString()
        }

        if (value && typeof value === 'object' && !Array.isArray(value)) {
            sanitize(value)
            if (Object.keys(value).length === 0) {
                delete data[key]
            }
        } else if (value === '' || value == null) {
            delete data[key]
        }
    })

    return data
}

export default sanitize