//methods: index, show, update, store, destroy

/*
index: listagem de sessões
store: criar uma sessão
show: listar uma unica sessão
update: alterar alguma sessão
destroy: destruir alguma sessão
*/

const User = require('../models/User');
const Yup = require('yup');
class SessionController{
    
    async store(req,res){
        const schema = Yup.object().shape({
            email : Yup.string().email().required()
        });
        const { email } = req.body;
        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'Falha na validação'});
        }
        //verificação de existência do usuário
        let user = await User.findOne({ email });

        
        if(!user){
            //criação de usuário
            user = await User.create({ email });
        }

        return res.json(user);
    }
}

module.exports = new SessionController();