// Import each model individually
const User = require("./User");
const Post = require("./Post");
const SearchTerm = require("./SearchTerm");
const Comment = require("./Comment");
const Code = require("./Code");
const Event = require("./Event");
const Promotion = require("./Promotion");
const Hashtag = require("./Hashtag");
const FoodVenue = require("./FoodVenue");

// Export all models as properties of an object
module.exports = {
  User,
  Post,
  SearchTerm,
  Comment,
  Code,
  Event,
  Promotion,
  Hashtag,
  FoodVenue,
};
