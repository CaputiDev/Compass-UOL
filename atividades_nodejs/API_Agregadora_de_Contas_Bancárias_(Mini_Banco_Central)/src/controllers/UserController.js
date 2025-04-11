import User from '../models/User.js';

class UserController {
    async create(req, res) {
    const { cpf, nome } = req.body;

    try {
        const user = await User.create({ cpf, nome });
        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({ error: 'Erro ao criar usuário', details: error.message });
        }
    }
}

export default new UserController();
