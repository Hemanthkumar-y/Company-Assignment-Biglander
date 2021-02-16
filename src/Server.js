const express = require('express');
const { Sequelize, DataTypes } = require('sequelize');

const connectString = 'postgres://rhcaoourgmpsfk:27c5b7bc9fa1d709656f46cf34b2ae8a5a2370592ca8e5b57d7939a2e7b6cd46@ec2-52-4-171-132.compute-1.amazonaws.com:5432/d10ouhji93415b'

const db = new Sequelize(connectString,{
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // 
          },
        }
});

const  ChhotaChetan = db.define('chhotachetan', {
    loan_id: {
      type: DataTypes.INTEGER ,
    },
    loan_amount: {
      type: DataTypes.INTEGER,
    },
    loan_date: {
      type: DataTypes.DATE 
    },
    TranctionId: {
        type : DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
  })

const app = express();
app.use(express.json());

app.get('/data', async(req,res)=>{
    // const newChhotaChetan = await ChhotaChetan.create({
    //     loan_id: req.body.loan_id
    //   });
    //   console.log(newChhotaChetan);
    // res.send(newChhotaChetan);

     const findchootaCheatan = async () => {
        try {
          const allDatas = await ChhotaChetan.findAll()
          console.log(allDatas);
          res.send(allDatas);          
        } catch (error) {
          next(error);
        }
      }
      findchootaCheatan(); 
})




db.sync().then(()=>{
    console.log("starting server");
    app.listen(7999);
  }).catch(e=>{
      console.log('failed to sync dataBase',e);
  });