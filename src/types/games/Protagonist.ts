type Protagonist = {
    id: number
    name: string
    slug: string
    story: string | null
    level: number
    owner: User | null
    portrait: Upload | null
}