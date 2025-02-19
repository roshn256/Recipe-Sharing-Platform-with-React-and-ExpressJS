const express = require('express');
const Recipe = require('../models/Recipe');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => { // 🛠 Fix: Require authentication for fetching recipes
  try {
    const recipes = await Recipe.find().populate('userId', 'username');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { title, ingredients, instructions, image } = req.body;
  try {
    const recipe = new Recipe({
      title,
      ingredients: Array.isArray(ingredients) ? ingredients : ingredients.split(','), // 🛠 Fix: Ensure ingredients is an array
      instructions,
      image,
      userId: req.user.id,
    });

    await recipe.save();
    res.json(recipe);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
});

module.exports = router;
