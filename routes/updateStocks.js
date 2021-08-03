const mongoose = require('mongoose');
const Company = require('../models/Company');
const cron = require('node-cron');

// const updater = cron.schedule('* * * * * *', async () => {
//     try {
//         const comps = await Company.find();
//         //res.json({comp : comp._id});
//         //res.send(comp._id);

//         for (var i = 0; i < comps.length; i++) {
//             // res.send(comps)
//             //console.log(comps[i]._id);
//             let randomInt = Math.floor(Math.random() * 100);
//             const UpdateStocks = await Company.findOne({ _id: comps[i]._id }, { $set: { compStocks: randomInt } });
//             try {
//                 res.json('Updated');
//                 console.log('comps[i]._id');
//             }
//             catch (err) {
//                 res.status(400).json({ message: err })
//             }

//         }

//     } catch (err) {
//         res.status(400).json({ message: err })
//     }

// });


const updater = () =>{
    cron.schedule('1 * * * * *', async () => {
        try {
            const comps = await Company.find();
            //res.json({comp : comp._id});
            //res.send(comp._id);
    
            for (var i = 0; i < comps.length; i++) {
                // res.send(comps)
                // console.log(comps[i]._id);
                let randomInt = Math.floor(Math.random() * 100);
                //console.log(randomInt);
                const UpdateStocks = await Company.updateOne({ _id: comps[i]._id }, { $set: { compStocks: randomInt } });
                // try {
                //     res.json('Updated');
                    //console.log('Updated' .comps[i]._id);
                // }
                // catch (err) {
                //     res.status(400).json({ message: err })
                // }
    
            }
    
        } catch (err) {
            res.status(400).json({ message: err })
        }
    });

}

module.exports = updater;