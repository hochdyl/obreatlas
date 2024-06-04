const getFormData = (data: any, form: FormData | null = null, namespace = ''): FormData => {
    let formData = form || new FormData()

    for (let propertyName in data) {
        let formKey = namespace ? `${namespace}[${propertyName}]` : propertyName

        if (data[propertyName] instanceof Date) {
            formData.append(formKey, data[propertyName].toISOString())
            continue
        }

        if (data[propertyName] instanceof Array) {
            data[propertyName].forEach((element: any, index: number) => {
                console.log(element, typeof index)
                const tempFormKey = `${formKey}[${index}]`
                getFormData(element, formData, tempFormKey)
            })
            continue
        }

        if (typeof data[propertyName] === 'object' && !(data[propertyName] instanceof File)) {
            getFormData(data[propertyName], formData, formKey)
            continue
        }

        formData.append(formKey, data[propertyName])
    }
    return formData
}

export default getFormData