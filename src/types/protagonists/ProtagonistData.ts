type ProtagonistData = Protagonist & {
    creator: AuthenticatedUser
    game: Game
    metricsValues: MetricValue[]
}