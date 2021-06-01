const Express = require('express');
const router = Express.Router();
const {LogModel} = require('../models');
let middleware = require('../middleware');


router.get("/", middleware.validateSession, async (req, res) =>{
    res.send('this is a test')
});

router.post("/", middleware.validateSession, async (req, res) =>{
    const {description, definition, result} = req.body.log;
    const {id} = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        // await LogModel.sync({ alter: true })
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog)
    } catch(err){
        res.status(500).json({
            error: err,
            user_id: id
        }

        )
    }
    // LogModel.create(logEntry)
});



// router.get("/:id", async (req, res) =>{

// });

module.exports = router;