const Express = require('express');
const router = Express.Router();
const {LogModel} = require('../models');
let validateJWT = require('../middleware/validate-session')

// router.post("/", async (req, res) =>{

// });

router.get("/", validateJWT, async (req, res) =>{
    res.send('this is a practice route')
});

// router.get("/:id", async (req, res) =>{

// });

module.exports = router;