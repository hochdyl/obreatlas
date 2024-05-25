const getImage = (upload: Upload | undefined, fallback: string) => {
    const path = `${process.env.API_URL}/uploads`

    if (upload) return `${path}/${upload.fileName}`

    return fallback
}
export default getImage