const Reserve = require('../models/Reserve');
const User = require('../models/User');
const House = require('../models/House');


class ReserveController{
    async destroy(req,res){
        const {reserve_id} = req.body;

    const reserve = await Reserve.findByIdAndDelete({_id: reserve_id}).populate('house');

        if (!reserve) {
            return res.status(404).json({ error: 'Reserva não encontrada.' });
        }

        return res.json({
            message: 'Excluída com sucesso!',
            'Reserva excluída': reserve
    });
}

    async index(req,res){
        const {user_id} = req.headers;

        const reserves = await Reserve.find({user : user_id}).populate('house');

        return res.json(reserves);
    }
    
    async store(req,res){
        const {user_id} = req.headers;
        const {house_id} = req.params;
        const {date} = req.body;

        const house = await House.findById(house_id);

        if(!house){
            return res.status(400).json({error:'Essa casa não existe'});
        }

        
        const user = await User.findById(user_id);
        if(String(user._id) == String(house.user)){
            return res.status(401).json({error:'Reserva não permitida'})
        }
        if(house.status != true){
            return res.status(400).json({error:'Casa ocupada'})
        }
        const reserve = await Reserve.create({
            user: user_id,
            house: house_id,
            date,
        });

        await reserve.populate('house');
        await reserve.populate('user');

        return res.json(reserve);
    }
    
}

module.exports = new ReserveController();