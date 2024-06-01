type ProtagonistData = Protagonist & {
    creator: AuthenticatedUser
    game: Game
    metrics: Metric[]
}