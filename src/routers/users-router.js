const express = require('express');
const UsersService = require('../services/UsersService');
const usersRouter = express.Router();
const jsonBodyParser = express.json();
const BuildService = require('../services/BuildService');

usersRouter
  .route('/:user_name')
  .get((req, res, next) => {
    BuildService.getUserBuilds(
      req.app.get('db'),
      req.params.user_name
    )
      .then(data => {
        res.status(200).json(data);
      })
      .catch(next);
  })
  .patch(jsonBodyParser, (req, res, next) => {
    
    BuildService.getUserBuilds(
      req.app.get('db'),
      req.params.user_name
    )
      .then(data => {
        const oldBuilds = data.classes;
        let newBuilds;
        if (oldBuilds === "") {
          newBuilds = {
            classes: req.body.build
          };
        } else {
          newBuilds = {
            classes: oldBuilds + ', ' + req.body.build
          };
        }

        BuildService.updateClasses(
          req.app.get('db'),
          req.params.user_name,
          newBuilds
        )
          // eslint-disable-next-line no-unused-vars
          .then(numRowsAffected => {
            res.status(204).end();
          })
          .catch(next);
      });
  })
  .delete(jsonBodyParser, (req, res, next) => {
    BuildService.getUserBuilds(
      req.app.get('db'),
      req.params.user_name
    )
      .then(data => {
        let newBuilds = {
          classes: req.body.build
        }
        BuildService.updateClasses(
          req.app.get('db'),
          req.params.user_name,
          newBuilds
        )
          .then(numRowsAffected => {
            res.status(204).end();
          })
          .catch(next);
      });
  });

    
    
    

module.exports = usersRouter;