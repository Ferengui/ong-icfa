const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Função para upload com tags e contexto (reutilizável)
const uploadImage = async (filePath, contextText = "") => {
  const result = await cloudinary.uploader.upload(filePath, {
    context: `alt=${contextText}`,
    tags: ['ong-fotos'],
    resource_type: 'image'
  });

  // Remove o arquivo temporário após upload
  fs.unlinkSync(filePath);

  return result;
};

// Função para deletar uma imagem pelo public_id
const deleteImage = async (publicId) => {
  const result = await cloudinary.uploader.destroy(publicId);
  return result;
};

module.exports = { uploadImage, deleteImage };
