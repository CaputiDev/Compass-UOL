import Conta from '../models/Conta.js';

class ContaController{
    async create(req,res){
        try{
            const {usuario_id, instituicao_id} = req.body;

            const usuario = await usuario.findByPK(usuario_id);
            const instituicao = await instituicao.findByPK(instituicao_id);

            if (!usuario || !instituicao) {
                return res.status(404).json({ error: 'Usuário ou instituição não encontrados' });
            }

            const contaExistente = await Conta.findOne({
                where: {
                    usuario_id,
                    instituicao_id
                }
            });
        
            if (contaExistente) {
                return res.status(409).json({ error: 'Usuário já possui uma conta nessa instituição' });
            }

            const novaConta = await Conta.create({
                usuario_id,
                instituicao_id,
                saldo: 0.0,
                nome_usuario: usuario.nome,
                cpf_usuario: usuario.cpf,
                nome_instituicao: instituicao.nome
            });
            return res.status(201).json(novaConta);
        }catch(error){
            return res.status(400).json({error: 'Erro ao criar Conta', details: error.message});
        }
    }
}
export default new ContaController();