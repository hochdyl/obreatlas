type PlayProtagonist = Protagonist & {
    creator: AuthenticatedUser
    game: Game
}