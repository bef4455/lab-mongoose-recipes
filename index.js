const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .set('strictQuery', false)
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({
      "title": "Lemon meringue tart recipe",
      "level": "Amateur Chef",
      "ingredients": [
        "150ml lemon juice (3 or 4 lemons) (⅔ cup)",
        "lemon zest from 1 natural unwaxed lemon",
        "150g sugar (or less according to taste) (¾ cup)",
        "3 eggs",
        "1 tbsp cornstarch or flour",
        "75 g butter (⅓ cup)",
      ],
      "cuisine": "Desert",
      "dishType": "main_course",
      "image": "https://www.hervecuisine.com/wp-content/uploads/tarte-au-citron.jpg",
      "duration": 30,
      "creator": "Chef Fab"
    })
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach(recipe => console.log(recipe.title))
    const rigatonSetitTo = { title: "Rigatoni alla Genovese" };
    return Recipe.findOneAndUpdate(rigatonSetitTo, { "duration": 100 }, { new: true });
  })
  .then((recipe) => console.log("Rigatoni duration modified"))

  .then(() => {
    return Recipe.deleteOne({
      "title": "Carrot Cake",
      "level": "Amateur Chef",
      "ingredients": [
        "6 cups grated carrots",
        "1 cup brown sugar",
        "1 cup raisins",
        "4 eggs",
        "1 1/2 cups white sugar",
        "1 cup vegetable oil",
        "2 teaspoons vanilla extract",
        "1 cup crushed pineapple, drained",
        "3 cups all-purpose flour",
        "1 1/2 teaspoons baking soda",
        "1 teaspoon salt",
        "4 teaspoons ground cinnamon"
      ],
      "cuisine": "International",
      "dishType": "dessert",
      "image": "https://images.media-allrecipes.com/userphotos/720x405/3605684.jpg",
      "duration": 130,
      "creator": "Chef Nadia"
    })
  })
  .then((recipe) => console.log("Les carottes sont cuites !"))

  .finally(() => {
    mongoose.connection.close()
  })


  .catch(error => {
    console.error('Error connecting to the database', error);
  });


