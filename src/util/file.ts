import fs from "fs";

export const deleteFile = async(filename: string) => {

    //stat - verifica se o arquivo existe
    try {
        await fs.promises.stat(filename);
    } catch {
        return;
    }
    //unlink - remove o arquivo
    await fs.promises.unlink(filename);
}