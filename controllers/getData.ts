const Brands = require("../models/brands-schema.ts");
import { faker } from "@faker-js/faker";

export const getBrands = async (req, res) => {
  try {
    const result = await Brands.find({}, {});
    const transformedBrands = await result.map((brand) => brand.toJSON());
    await result.forEach(async (item, index) => {
      await Brands.findOneAndReplace(
        { _id: item._id },
        transformedBrands[index],
        { new: true, upsert: true, setDefaultsOnInsert: true }
      );
    });
    res.send(result);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
};

export const seedData = async (req, res) => {
  interface IBrand {
    brandName: string;
    headquarters: string;
    numberOfLocations: number;
    yearFounded: number;
  }
  function createRandomBrands(): IBrand {
    return {
      brandName: faker.string.alpha({ length: 6 }),
      headquarters: faker.string.alpha({ length: { min: 4, max: 12 } }),
      numberOfLocations: faker.number.int({ min: 1, max: 1000 }),
      yearFounded: faker.number.int({
        min: 1600,
        max: new Date().getFullYear(),
      }),
    };
  }
  try {
    const newData: IBrand[] = await faker.helpers.multiple(createRandomBrands, {
      count: 10,
    });
    newData.map(async (item) => {
      const created = await new Brands(item);
      created
        .save()
        .then((data) => {})
        .catch((error) => {
          console.log(error);
        });
    });
    res.status(201).send("Data seeded successfully");
  } catch (error) {
    res.status(400).send("Something went wrong");
  }
};
