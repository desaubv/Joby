const sharp = require('sharp');
const fs = require('fs');

class FilesHandler{
    deleteAllFilesFromArray(array, key){
        array.forEach(f => {
            if(f == undefined) return;
            fs.unlinkSync(f[key]);
        });
    }

    getAllFilesFromReq(req){
        const { files } = req;
        if(files === undefined) return {}

        return files;
    }
}

module.exports = new FilesHandler();