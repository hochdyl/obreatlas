type SWRGame =
    CreateGameFormData
    & Partial<Game>
    & Omit<Game, 'id' | 'createdAt' | 'updatedAt' | 'owner'>;