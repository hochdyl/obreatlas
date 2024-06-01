type Metric = {
    id: number
    value: number
    max: number | null
    metric: {
        id: number
        name: string
        emoji: string | null
    }
}