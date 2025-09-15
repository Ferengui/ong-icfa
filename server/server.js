// Carregar variáveis de ambiente do arquivo .env
require('dotenv').config();  

const express = require('express');
const fileUpload = require('express-fileupload');  // Middleware para upload de arquivos
const imageRoutes = require('../routes/imageRoutes');  // Importando as rotas de imagem

// Inicializar o Express
const app = express();

// Configuração da porta (deve ser configurada no .env ou fallback para 3000)
const port = process.env.PORT || 3000;

// Usar middleware para upload de arquivos
app.use(fileUpload());

// Configurar rotas de imagens
app.use('/api/images', imageRoutes);

// Rodar o servidor na porta configurada
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});



/*require('dotenv').config();
const express = require('express');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const app = express();
const PORT = process.env.PORT || 3000;

// Configuração do Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

// Rota para buscar imagens da tag 'ong-fotos'
app.get('/api/images', async (req, res) => {
  try {
    const result = await cloudinary.api.resources_by_tag('ong-fotos', {
      context: true,
      max_results: 150
    });

    // Formatar os dados para o frontend
    const images = result.resources.map((img) => ({
      url: img.secure_url,
      alt: img.context?.custom?.alt || 'Imagem da ONG',
    }));

    res.json(images);
  } catch (err) {
    console.error('Erro ao buscar imagens:', err.message);
    res.status(500).json({ error: 'Erro ao buscar imagens' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em: http://localhost:${PORT}`);
});
*/