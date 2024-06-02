type CreateProtagonistFormData = {
    name: string
    slug: string
    story: string | null
    portrait: File | Upload | null
}