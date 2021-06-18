const Express = require('express');
const router = Express.Router();
const {LogModel} = require('../models');
let middleware = require('../middleware');


router.get("/", middleware.validateSession, async (req, res) =>{
    try{
        console.log('user info', req.user.id);
        const allLogs = await LogModel.findAll(
            {where: {owner_id: req.user.id}}
        );
        res.status(200).json(allLogs);
    } catch(err){
        res.status(500).json({
            error: err
        })
    }
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
    console.log(req.body);
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog)
    } catch(err){
        res.status(500).json({
            logEntry,
            error: err,
            user_id: id
        }

        )
    }
});



router.get("/:id", middleware.validateSession, async (req, res) =>{
    try{ 
        const locatedLog = await LogModel.findOne({
        where: {id: req.params.id}
    })
    res.status(200).json({
        log: locatedLog
    })
    } catch(err) {
        res.status(500).json({
            message: `Failed to retrieve log: ${err}`
        })

    }
});

router.put("/:id", middleware.validateSession, async(req, res) =>{
    const {description, definition, result} = req.body.log;
    // const {id} = req.user;
    try{
        const updatedLog = await LogModel.update({
            description,
            definition,
            result,
            owner_id: req.user.id
        },
            {where: {id: req.params.id}}
            )

            res.status(200).json({
                updatedLog
            })
    } catch(err) {
        res.status(500).json({
            message:`failed to update log: ${err}`
        })

    }
});

router.delete("/:id", middleware.validateSession, async (req, res) => {
    try{
        const locatedLog = await LogModel.destroy({
            where: {id: req.params.id}
        })
        res.status(200).json({
            deletedLog: locatedLog
            })
        } catch(err) {
            res.status(500).json({
                message: `Failed to delete log: ${err}`
            })
        }
    }
);
module.exports = router;