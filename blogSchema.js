var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var blogSchema = new Schema({
  title: { type: String, required: true, default:''},
  subTitle: { type: String, default:'' },
  blogBody: { type: String, default:'' },
  tags: [],
  createdAt: { type:Date},
  updatedAt: { type:Date},
  author: {type:String}
});

// we need to create a model using it
mongoose.model('Blog', blogSchema);