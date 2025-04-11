//methods: index, show, update, store, destroy

/*
index: listagem de sessões
store: criar uma sessão
show: listar uma unica sessão
update: alterar alguma sessão
destroy: destruir alguma sessão
*/
const House = require('../models/House');
const SessionController = require('../controllers/SessionController');
const User = require('../models/User');
const Yup = require('yup');


class HouseController{

    //Filtrar House por parametro
    async index(req, res){
        const {status} = req.query;
        const houses = await House.find({ status });
            
        return res.json(houses);
    }

    //criar uma House
    async store(req,res){
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        });
        
        const {filename} = req.file;
        const {description,price,location,status} = req.body;
        const {user_id} = req.headers;

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'Falha na validação'});
        }
        
        const house = await House.create({
            user : user_id,
            thumbnail : filename,
            description : description,
            price,
            location,
            status,
        })
        
        return res.json(house);
        
    }

    async update(req,res){
        const schema = Yup.object().shape({
            description: Yup.string().required(),
            price: Yup.number().required(),
            location: Yup.string().required(),
            status: Yup.boolean().required(),
        });
        const {filename} = req.file;
        const {house_id} = req.params;
        const {description,price,location,status} = req.body;
        const {user_id} = req.headers;
        
        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({error:'Falha na validação'});
        }
        if(String(user._id) !== String(houses.user)){
        return res.status(401).json({
            error: 'Não Autorizado.',
        });
        }
        await House.updateOne({_id:house_id },{
            user : user_id,
            thumbnail : filename,
            description : description,
            price,
            location,
            status
        });
        return res.send();
        
    }

    async destroy(req,res){
        const {house_id} = req.body;
        const {user_id} = req.headers;

        const user = await User.findById(user_id);
        const houses = await House.findById(house_id);

        if(String(user._id) !== String(houses.user)){
            return res.status(401).json({
                error: 'Não Autorizado.',
            });
        }
        
        await House.findByIdAndDelete({_id: house_id});

        return res.json({message: 'excluída com sucesso!'});
    

    

}
}
module.exports = new HouseController();