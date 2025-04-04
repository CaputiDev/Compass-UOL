//methods: index, show, update, store, destroy

/*
index: listagem de sessões
store: criar uma sessão
show: listar uma unica sessão
update: alterar alguma sessão
destroy: destruir alguma sessão
*/
const House = require('../models/House');
const SessionController = require('../controllers/SessionController')

class HouseController{

    async store(req,res){
        const {filename} = req.file;
        const {description,price,location,status} = req.body;
        const {user_id} = req.headers
        
        const house = await House.create({
            user : user_id,
            thumbnail : filename,
            description : description,
            price,
            location,
            status
        })
        
        return res.json(house);
        //const {thumbnail} = req.body;
        
    }

    

}


module.exports = new HouseController();