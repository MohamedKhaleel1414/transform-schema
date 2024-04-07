const mongoose = require("mongoose");
const { Schema } = mongoose;

const brandSchema = new Schema({
  brandName: {
    type: String,
    required: [true, 'Brand name is required'],
    trim: true,
  },
  yearFounded: {
    type: Number,
    required: [true, 'Year founded is required'],
    min: [1600, 'Year founded seems too old'],
    max: [new Date().getFullYear(), 'Year founded cannot be in the future'],
  },
  headquarters: {
    type: String,
    required: [true, 'Headquarters location is required'],
    trim: true,
  },
  numberOfLocations: {
    type: Number,
    required: [true, 'Number of locations is required'],
    min: [1, 'There should be at least one location'],
  },
}, {
	timestamps: true,
});

brandSchema.methods.toJSON = function () {
  const brandObject = this.toObject();
  brandObject.brandName = brandObject.brandName || brandObject.brand.name;
  brandObject.yearFounded = Number(brandObject.yearFounded) || Number(brandObject.yearsFounded) || Number(brandObject.yearCreated) || 1600;
  brandObject.headquarters = brandObject.headquarters || brandObject.hqAddress;
  brandObject.numberOfLocations = Number(brandObject.numberOfLocations) || 1;
  delete brandObject.hqAddress;
  delete brandObject.yearCreated;
  delete brandObject.yearsFounded;
  delete brandObject.brand;
  return brandObject;
};

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;