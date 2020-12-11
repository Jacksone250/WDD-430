const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');

const Character = require('../models/Character');

function returnError(res, error){
    res
        .status(500)
        .json({
            message: 'An error ocurred!',
            error: error
        });
}

// handles getAll 
router.get('/', (req, res, next) => {
    Character.find()
        .then((characters) => {
            res
                .status(200)
                .json({
                    message: 'Characters fetched successfully!',
                    characters: characters
                });
        })
        .catch(error => {
            returnError(res, error);
        });
});

// handles getOne
router.get("/:id", (req, res, next) => {
    Character.findOne({ 
      id: req.params.id 
    })
    .populate('group')
    .then(character => {
      console.log('character found');
      res
        .status(200)
        .json({
            message: 'Character fetched successfully!',
            character: character
        });
    })
    .catch(error => {
      console.log('error caught');
      res.status(500).json({
        message: 'Character not found.',
        error: { character: 'Character not found'}
      });
    });
});

// handles post
router.post('/', (req, res, next) => {
    const maxCharacterId = sequenceGenerator.nextId("characters");
  
    const character = new Character({
        id: maxCharacterId,
        characterName: req.body.characterName,
        characterDescription: req.body.characterDescription
    });
  
    character.save()
      .then(createdCharacter => {
        res.status(201).json({
            message: 'Character added successfully',
            character: createdCharacter
        });
      })
      .catch(error => {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
      });
});

// handles update
router.put('/:id', (req, res, next) => {
    Character.findOne({ id: req.params.id })
      .then(character => {
        character.characterName = req.body.characterName;
        character.characterDescription = req.body.characterDescription;
  
        Character.updateOne({ id: req.params.id }, character)
          .then(result => {
            res.status(204).json({
              message: 'Character updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Character not found.',
          error: { character: 'Character not found'}
        });
      });
});

// handles delete
router.delete("/:id", (req, res, next) => {
    Character.findOne({ id: req.params.id })
      .then(character => {
        Character.deleteOne({ id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Character deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Character not found.',
          error: { character: 'Character not found'}
        });
      });
});

module.exports = router; 