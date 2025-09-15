const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

//Configuração do Cloudinary - certifique-se de que está configurado em outro lugar
cloudinary.config({
cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
api_key: process.env.CLOUDINARY_API_KEY,
api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Importante: esta lista pode ser persistida num banco ou arquivo JSON
let imagensJSON = [];

// Rota para listar as imagens
router.get('/', (req, res) => {
  // Se estiver guardando num arquivo, pode ler aqui:
  try {
    const data = fs.readFileSync(path.join(__dirname, '..', 'imagens.json'), 'utf-8');
    imagensJSON = JSON.parse(data);
  } catch (error) {
    imagensJSON = [];
  }
  res.json(imagensJSON);
});

// Rota para upload de uma imagem
router.post('/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: 'Nenhuma imagem enviada.' });
    }

    const imageFile = req.files.image;
    
    // Upload para Cloudinary
    const result = await cloudinary.uploader.upload(imageFile.tempFilePath || imageFile.data, {
      folder: 'ong-fotos',
      context: `alt=${imageFile.name}`
    });

    const novaImagem = {
      public_id: result.public_id,
      src: result.secure_url,
      text: imageFile.name
    };

    // Atualiza lista e salva
    imagensJSON.push(novaImagem);
    fs.writeFileSync(path.join(__dirname, '..', 'imagens.json'), JSON.stringify(imagensJSON, null, 2));

    res.status(201).json(novaImagem);
  } catch (error) {
    console.error('Erro no upload:', error);
    res.status(500).json({ message: 'Erro no upload da imagem.' });
  }
});

// Rota para deletar imagem pelo public_id do Cloudinary
router.delete('/:public_id', async (req, res) => {
  const publicId = req.params.public_id;

  try {
    // Deleta do Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Remove da lista local e salva
    imagensJSON = imagensJSON.filter(img => img.public_id !== publicId);
    fs.writeFileSync(path.join(__dirname, '..', 'imagens.json'), JSON.stringify(imagensJSON, null, 2));

    res.json({ message: 'Imagem deletada com sucesso.' });
  } catch (error) {
    console.error('Erro ao deletar imagem:', error);
    res.status(500).json({ message: 'Erro ao deletar imagem.' });
  }
});

module.exports = router;
