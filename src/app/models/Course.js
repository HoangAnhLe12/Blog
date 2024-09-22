const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Course = new Schema(
   {
      _id: { type: Number },
      name: { type: String, required: true },
      description: { type: String },
      image: { type: String },
      slug: { type: String, slug: 'name', unique: true },
      videoId: { type: String, required: true },
   },
   {
      _id: false,
      timestamps: true,
   },
);

//Custom query helpers
Course.query.sortable = function (req) {
   if (req.query.hasOwnProperty('_sort')) {
      const isValidType = ['asc', 'desc'].includes(req.query.type);
      return this.sort({
         [req.query.column]: isValidType ? req.query.type : 'desc',
      });
   }
   return this;
};

//Add plugin
mongoose.plugin(slug);
Course.plugin(AutoIncrement);
Course.plugin(mongooseDelete, { overrideMethods: 'all', deletedAt: true });

module.exports = mongoose.model('Course', Course);
