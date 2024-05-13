import {createProtagonist} from "@/api/games/protagonists/ProtagonistApi";
import {MutatorOptions} from "swr";

export const createProtagonistMutation = async (gameSlug: string, protagonists: SWRProtagonist[], newProtagonist: CreateProtagonistFormData) => {
    const addedProtagonist = await createProtagonist(gameSlug, newProtagonist)
    return [addedProtagonist, ...protagonists]
}

export const createProtagonistOptions = (protagonists: SWRProtagonist[], newProtagonist: CreateProtagonistFormData): MutatorOptions<SWRProtagonist[], CreateProtagonistFormData> => {
    return {
        optimisticData: [{...newProtagonist, portrait: {fileName: 'default.jpg'}}, ...protagonists],
        rollbackOnError: true
    }
}