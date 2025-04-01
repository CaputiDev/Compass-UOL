//methods: index, show, update, store, destroy

/*
index: listagem de sessões
store: criar uma sessão
show: listar uma unica sessão
update: alterar alguma sessão
destroy: destruir alguma sessão
*/

const User = require('../models/User');

class SessionController{
    
    async store(req,res){
        const { email } = req.body;

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