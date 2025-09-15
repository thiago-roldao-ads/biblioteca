const express = require('express');
const router = express.Router();
const Livro = require('../models/livros');

// Criar novo livro
router.post('/', async (req, res) => {
    try {
        const novoLivro = new Livro(req.body);
        await novoLivro.save();
        res.status(201).json(novoLivro);
    } catch (err) {
        res.status(400).json({ erro: err.message });
    }
});

// Buscar por título ou autor
router.get('/buscar', async (req, res) => {
    const { termo } = req.query;
    try {
        const livros = await Livro.find({
            $or: [
                { titulo: new RegExp(termo, 'i') },
                { autor: new RegExp(termo, 'i') }
            ]
        });
        res.json(livros);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Listar todos os livros
router.get('/', async (req, res) => {
    try {
        const livros = await Livro.find();
        res.json(livros);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Deletar livro por ID
router.delete('/:id', async (req, res) => {
    try {
        await Livro.findByIdAndDelete(req.params.id);
        res.json({ mensagem: 'Livro deletado' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;