const getImage = (file: Upload | null, fallback: string) => {
    if (!file) return fallback

    const path = `${process.env.API_URL}${process.env.UPLOAD_PATH}`

    return `${path}/${file.fileName}`
}
export default getImage