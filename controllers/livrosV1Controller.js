const { Livro } = require('../models');
const Op = require('sequelize').Op;

const livrosV1Controller = {
    showAllBooks: async (req, res) => {
        const books = await Livro.findAll();
        return res.status(200).json({ books })
    },
    showOneBook: async (req, res) => {
        try {
            const { id } = req.params
            const book = await Livro.findByPk(id);
            if (!book) {
                return res.status(400).json({ error: true,message: 'Livro não encontrado' })    
            }
                return res.status(200).json({ book })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: true,message: 'Erro ao buscar livro,tente novamente mais tarde!' })
        }
    },
    store: async (req, res) => {
        try {
            const { titulo, quantidade_paginas, autor, ano_lancamento, estoque } = req.body;

            const bookExists = await Livro.findOne({
                where: {
                    [Op.and]: [{ titulo }, { autor }]
                }
            });
            if (bookExists) {
                return res.status(422).json({message:"Livro já cadastrado!"})
            }
            const newBook = await Livro.create({
                titulo,
                quantidade_paginas,
                autor,
                ano_lancamento,
                estoque
            });
            return res.status(201).json({ message: "Livro cadastrado com sucessp", newBook })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: true, message: 'Erro ao cadastrar livro,tente novamente mais tarde!' })
        }
       
    },
    edit: async (req, res) => {
        try {
            const { id } = req.params;
            const { titulo, quantidade_paginas, autor, ano_lancamento, estoque } = req.body;
            const book = await Livro.findByPk(id);
            if (!book) {
                return res.status(400).json({ error: true,message: 'Livro não encontrado' })    
            }
            await book.update({
                titulo,
                quantidade_paginas,
                autor,
                ano_lancamento,
                estoque
            });
            return res.status(200).json({ message: "Livro atualizado com sucesso", book })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: true,message: 'Erro ao atualizar livro,tente novamente mais tarde!' })
        }
    },
    deleted: async (req, res) => {
        try {
            const { id } = req.params;
            const book = await Livro.findByPk(id);
            if (!book) {
                return res.status(400).json({ error: true,message: 'Livro não encontrado' })    
            }
            await book.destroy();
            return res.status(200).json({ message: "Livro deletado com sucesso" })
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: true,message: 'Erro ao deletar livro,tente novamente mais tarde!' })
        }
    }

}  

module.exports = livrosV1Controller;