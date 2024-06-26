const getImage = (file: Upload | null) => {
    if (!file) {
        return '/images/default.png'
    }

    const path = `${process.env.API_URL}${process.env.UPLOAD_PATH}`

    return `${path}/${file.fileName}`
}
export default getImage