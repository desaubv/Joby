const cloudinary = require("cloudinary").v2;

class CloudinaryHandler {

    async uploadFile(filePath, folder){

        return new Promise((resolve, reject) => {

            cloudinary.uploader.upload(filePath, {
                public_id: Date.now(),
                resource_type: 'auto',
                folder: 'joby:'+folder
            })
            .then(data => resolve(data.secure_url))
            .catch(err => {
                console.log(err);

                reject(err)
            });

        })

    }

}

module.exports = new CloudinaryHandler();