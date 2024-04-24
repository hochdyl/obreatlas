type Game = {
    id: number
    owner: Omit<User, 'apiToken'>
    title: string,
    createdAt: string,
    updatedAt: string,
}