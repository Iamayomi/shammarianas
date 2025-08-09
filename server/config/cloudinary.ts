import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'your-cloud-name',
  api_key: process.env.CLOUDINARY_API_KEY || 'your-api-key',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'your-api-secret'
});

// Configure multer with Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'shammarianas',
    allowed_formats: [
      // Images
      'jpg', 'jpeg', 'png', 'gif', 'webp', 'svg',
      // Archives
      'zip', 'rar', '7z', 'tar', 'gz',
      // Documents
      'pdf', 'doc', 'docx', 'txt',
      // Videos
      'mp4', 'mov', 'avi', 'mkv', 'flv', 'webm',
      // Audio
      'mp3', 'wav', 'ogg', 'aac', 'flac',
      // Design Files
      'psd', 'ai', 'eps', 'sketch', 'fig', 'xd',
      // Applications
      'exe', 'dmg', 'pkg', 'apk', 'ipa',
      // Code
      'js', 'css', 'html', 'json', 'xml'
    ],
    resource_type: 'auto'
  } as any
});

export const upload = multer({ storage });

export { cloudinary };
