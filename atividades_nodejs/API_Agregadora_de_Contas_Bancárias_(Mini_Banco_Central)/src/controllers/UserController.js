import User from '../models/User.js';

class UserController {
    async create(req, res) {
        const { cpf, nome } = req.body;

        try {
        
            const existingCpf = await User.findOne({ where: { cpf } });
            if (existingCpf) {
            return res.status(409).json({ error: 'Já existe um usuário com este CPF.' });
        }      
            const existingName = await User.findOne({ where: { nome } });
            if (existingName) {
            return res.status(409).json({ error: 'Já existe um usuário com este nome.' });
        }

            const user = await User.create({ cpf, nome });
            return res.status(201).json(user);

        } catch (error) {
            return res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
        }
}
}

export default new UserController();
