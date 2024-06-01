const sanitize = (data: any) => {
    Object.keys(data).forEach(key => {
        if (data[key] && typeof data[key] === 'object' && !Array.isArray(data[key])) {
            sanitize(data[key]);
            if (Object.keys(data[key]).length === 0) {
                delete data[key];
            }
        } else if (data[key] === '' || data[key] == null) {
            delete data[key];
        }
    });

    return data;
}

export default sanitize;