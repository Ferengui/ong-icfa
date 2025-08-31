require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadFolder = './images'; // Pasta local
const tag = 'ong-fotos';         // Tag para todas as imagens

fs.readdir(uploadFolder, (err, files) => {
    if (err) {
        console.error('Erro ao ler a pasta:', err);
        return;
    }

    files.forEach((file) => {
        const filePath = path.join(uploadFolder, file);

        cloudinary.uploader.upload(filePath, {
            tags: tag,
            context: `alt=Foto da ONG: ${file}`
        })
        .then(result => {
            console.log('✅ Enviado:', result.public_id);
        })
        .catch(error => {
            console.error('❌ Erro ao enviar:', error);
        });
    });
});
