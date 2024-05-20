const slugify = (string: string) => {
    return string.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+(?=\S)/g, '-')
        .replace(/\s+$/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+|-+$/g, '')
        .trim()
}
export default slugify