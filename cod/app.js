const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 3000;

// Configuração do Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// Middleware para servir arquivos estáticos
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Página de upload
app.get('/', (req, res) => {
    res.send(`
        <h2>Upload de Arquivos</h2>
        <form action="/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="arquivo" />
            <button type="submit">Enviar</button>
        </form>
    `);
});

// Rota de upload
app.post('/upload', upload.single('arquivo'), (req, res) => {
    if (!req.file) {
        return res.send('Nenhum arquivo enviado.');
    }
    res.send(`Arquivo enviado com sucesso! <a href="/uploads/${req.file.filename}">Ver arquivo</a>`);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
