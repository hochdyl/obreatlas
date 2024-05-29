abstract class PermissionService {
    static isGameMaster = (user: AuthenticatedUser, game: Game) => user.id === game.gameMaster.id
}
export default PermissionService