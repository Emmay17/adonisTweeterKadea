import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs/promises';
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});
export default class CloudinaryService {
    static async upload(filePath) {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'auto',
        });
        await fs.unlink(filePath);
        return result;
    }
    static async uploadVideo(filePath, folder = 'adonis_uploads') {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(filePath, { folder, resource_type: 'video' }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
        });
    }
}
//# sourceMappingURL=CloudinaryService.js.map