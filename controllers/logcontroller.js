var router = require('express').Router();
const { Router } = require('express');
var sequelize = require('../db');
var User = sequelize.import('../models/user');
var LogModel = sequelize.import('../models/log');



/*********************************
 * GET-/LOG/
 ********************************/
router.get('/log/', function (req, res) {   //Gets all logs for an individual user.
    var userid = req.user.id;

    LogModel
    .findAll({
        where: { owner_id: userid}
    })
    .then(
        function findAllSuccess(data) {
            res.json(data);
        },
        function findAllError(err) {
            res.send(500, err.message);
        }
    );
});

/*********************************
 * POST-/LOG/
 ********************************/
router.post('/log/', function (req, res) {   //Allows users to create a workout log with descriptions, definitions, results, and owner_id properties.
    var owner_id = req.user.id;
    var description = req.body.description;
    var definition = req.body.definition;
    var result = req.body.result;
    


    LogModel
        .create({
            description: description,
            definition: definition,
            result: result,
            owner_id: owner_id
    })
    .then(
        function createSuccess(data) {
            res.json({
                postgresResponse: data
            });
        },
        function createError(err) {
            res.send(500, err.message);
        }

    );
});

/*********************************
 * GET-/LOG/:ID
 ********************************/
router.get('/log/:id', function(req, res) {   //Gets individual logs by [id] for an individual user.
    var data = req.params.id;
    var userid = req.user.id;

    LogModel
        .findOne({
            where: { id:data, owner_id: userid }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function finOneError(err) {
                res.send(500, err.message);
            }
        );
});

/*********************************
 * DELETE-/LOG/:ID
 ********************************/
router.delete('/log/:id', function(req, res) {    //Allows individual logs to deleted by a user.
    var data = req.params.id;
    var userid = req.user.id;

    LogModel
        .destroy({
            where: { id: data, owner_id : userid }
        }).then(
            function deleteLogSuccess(data){
                res.send("you removed a log");
            },
            function deleteLogError(err){
                res.send(500, err.message);
            }
        );
});


/*********************************
 * PUT-/LOG/:ID
 ********************************/
router.put('/log/:id', function(req, res) {       //Allows individual logs to be updated by a user.   
    var data = req.params.id;
    var definition = req.body.definition;
    var description = req.body.description;
    var result = req.body.result;

    LogModel
        .update({
            definition: definition,// corrolates to the table column  <= : => goes into the tabel row.
            description: description,
            result: result
        },
        {where: {id: data}}
        ).then(
            function updateSuccess(updatedLog) {
                res.json({
                    definition: definition,
                    description: description,
                    result: result

                });
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});

 module.exports = router;