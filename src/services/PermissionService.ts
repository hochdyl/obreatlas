abstract class PermissionService {
    static editGame = (user: User, game: GameDashboard) => (
        user.id === game.owner.id  // User is game owner
    )

    static editProtagonist = (user: User, protagonist: ProtagonistDashboard) => (
        user.id === protagonist.game.owner.id || // User is game owner
        (protagonist.owner && user.id === protagonist.owner.id) || // User is protagonist owner
        (!protagonist.owner && user.id === protagonist.creator.id) // No protagonist owner and user is creator
    )
}
export default PermissionService