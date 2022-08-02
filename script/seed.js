"use strict";

const {
  db,
  models: { User, Item },
} = require("../server/db");

const items = [
  {
    name: "Spiderman",
    imageUrl:
      "https://i.annihil.us/u/prod/marvel/i/mg/a/c0/62dab23aae000/portrait_uncanny.jpg",
    price: 19.99,
  },

  {
    name: "IronMan",
    imageUrl:
      "https://i.annihil.us/u/prod/marvel/i/mg/5/80/62dab283063a1/portrait_uncanny.jpg",
    price: 18.99,
  },
  {
    name: "X-Man",
    imageUrl:
      "https://i.annihil.us/u/prod/marvel/i/mg/b/40/62dab23aad018/portrait_uncanny.jpg",
    price: 88.99,
  },
  {
    name: "Alex",

    price: 28.99,
  },
  {
    name: "Alexis",

    price: 88.99,
  },
  {
    name: "Dat",

    price: 88.99,
  },
  {
    name: "Chris",

    price: 88.99,
  },
];

const users = [
  {
    username: "ComicBookGuy42069",
    password: "password123",
  },
];
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  try {
    await db.sync({ force: true }); // clears db and matches models to tables
    console.log("db synced!");

    await Promise.all(
      items.map((item) => {
        return Item.create(item);
      })
    );
    // Creating Users
    const users = await Promise.all([
      User.create({ username: "cody", password: "123" }),
      User.create({ username: "murphy", password: "123" }),
    ]);

    console.log(`seeded ${users.length} users`);
    console.log(`seeded successfully`);
    return {
      users: {
        cody: users[0],
        murphy: users[1],
      },
    };
  } catch (err) {
    console.log(err);
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
