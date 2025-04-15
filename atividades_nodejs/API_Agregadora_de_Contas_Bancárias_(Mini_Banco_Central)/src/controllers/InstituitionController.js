import Institution from '../models/Institution.js';

class InstitutionController{
  async create(req, res) {
  try {
    const { nome, cnpj } = req.body;
    
    
    const InstitutionIsValid = await Institution.findOne({ where: { nome } });
    if (InstitutionIsValid) {
      return res.status(400).json({ error: 'Já existe uma instituição com este nome.' });
    }

    
    const instituicaoExistenteCNPJ = await Institution.findOne({ where: { cnpj } });
    if (instituicaoExistenteCNPJ) {
      return res.status(400).json({ error: 'Já existe uma instituição com este CNPJ.' });
    }

    
    const instituicao = await Institution.create({ nome, cnpj });

    return res.status(201).json(instituicao);
  } catch (error) {
    return res.status(400).json({ error: 'Erro ao criar instituição', details: error.message });
  }
}
}

export default new InstitutionController();
