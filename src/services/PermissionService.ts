abstract class PermissionService {
    static isGameOwner = (user: User, game: Game) => user.id === game.owner.id
}
export default PermissionService