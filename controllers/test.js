const { Balance, Conjunction, Product, Transaction, User } = require("../models")

class ControllerTest {

    static showData(req,res){
        User.findAll(
            {
            include : {
            model : Product
            // through : {
            //     attributes: ['UserId','ProductId']
            // }
        }}
        )
        .then(result =>{
            res.send(result)
        })
        .catch(err =>{
            res.send(err)
        })
    }

}

module.exports = ControllerTest