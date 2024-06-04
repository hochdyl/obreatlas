const sanitize = (data: any) => {
    Object.keys(data).forEach(key => {
        const value = data[key]

        if (value instanceof File) return

        if (value instanceof Date) {
            data[key] = value.toISOString()
            return
        }

        switch (true) {
            case Array.isArray(value):
                data[key] = value.map(item => {
                    if (item && typeof item === 'object' && !(item instanceof File) && !(item instanceof Date)) {
                        return sanitize(item)
                    }
                    return item !== '' && item != null ? item : null
                })
                break

            case value && typeof value === 'object':
                sanitize(value)
                if (Object.keys(value).length === 0) {
                    data[key] = null
                }
                break

            case value === '' || value == null:
                data[key] = null
                break
        }
    })

    return data
}

export default sanitize