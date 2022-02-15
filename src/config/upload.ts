import crypto  from "crypto";
import multer from "multer";
//resolve - faz a referência da pasta aonde vamos salvar as imagens.
import { resolve } from "path";


export default {

    upload(folder: string){
        
        return {
            storage: multer.diskStorage({
                destination: resolve(__dirname, "..", "..", folder),

                filename: (request, file, callback) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const filename = `${fileHash}_${file.originalname}`;

                    return callback(null, filename);
                }
            })
        };

    }
};
