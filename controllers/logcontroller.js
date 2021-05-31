const Express = require('express');
const router = Express.Router();
const {LogModel} = require('../models');
let validateJWT = require('../middleware')

router.post("/", validateJWT.validateSession, async (req, res) =>{
    const {description, definition, result} = req.body.log;
    const {id} = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog)
    } catch(err){
        res.status(500).json({
            error: err,
            user_id: id
        }

        )
    }
    LogModel.create(logEntry)
});

router.get("/", validateJWT, async (req, res) =>{
    res.send('this is a practice route')
});

// router.get("/:id", async (req, res) =>{

// });

module.exports = router;