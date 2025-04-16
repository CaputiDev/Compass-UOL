import Transacao from '../models/Transacao'
import Conta from '../models/Conta.js';
import Usuario from '../models/User.js';
import Instituicao from '../models/Institution.js';

class TransacaoController{
    async create(req,res){
        const {usuario_id, instituicao_id} = req.body;

        const usuario = await Usuario.findByPk(usuario_id);
        const instituicao = await Instituicao.findByPk(instituicao_id);

        
    }
}

export default new TransacaoController();