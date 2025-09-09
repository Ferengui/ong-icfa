require('dotenv').config();
process.env.CLOUDINARY_API_KEY

const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');



// Configurações do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Caminho para a pasta com as imagens
const uploadFolder = 'E:\\Users\\ahmr\\Pictures\\ONG-ICFAS-08-23-2025'; // ajuste conforme necessário
const tag = 'ong-fotos';

// Lista que armazenará os dados das imagens
const imagensJSON = [];

// Função para subir uma imagem
async function uploadImage(filePath, fileName) {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      tags: [tag],
      context: `alt=${fileName}`,
    });

    // Adiciona a imagem à lista
   imagensJSON.push({
  src: result.secure_url,
  text: fileName,
  public_id: result.public_id
});


    console.log(`✅ Enviado: ${fileName}`);
  } catch (error) {
    console.error(`❌ Erro ao enviar ${fileName}:`, error.message);
  }
}

// Função principal
async function uploadAllImages() {
  const files = fs.readdirSync(uploadFolder);

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp'];

    if (validExtensions.includes(ext)) {
      const filePath = path.join(uploadFolder, file);
      const fileName = path.basename(file, ext); // nome do arquivo sem extensão
      await uploadImage(filePath, fileName);
    }
  }

  // Salva as URLs e textos em imagens.json
  fs.writeFileSync('imagens.json', JSON.stringify(imagensJSON, null, 2), 'utf8');
  console.log('\n📝 Arquivo imagens.json criado com sucesso!');
}

// Iniciar
uploadAllImages();
