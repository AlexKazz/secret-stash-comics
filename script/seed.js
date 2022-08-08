"use strict";

const {
  db,
  models: { User, Item, Order },
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
    name: "X-Men",
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
  {
    name: "The Power of Iron Man",
    imageUrl:
      "https://i.annihil.us/u/prod/marvel/i/mg/b/b0/62dab23aa338f/portrait_uncanny.jpg",
    price: 1.99,
  },
  {
    name: "Demon Wars: The Iron Samurai",
    imageUrl:
      "https://i.annihil.us/u/prod/marvel/i/mg/9/10/62dab2848dd12/portrait_uncanny.jpg",
    price: 6.99,
  },
  {
    name: "Edge of Spider-Verse",
    imageUrl:
      "https://i.annihil.us/u/prod/marvel/i/mg/6/70/62dab283f2981/portrait_uncanny.jpg",
    price: 5.99,
  },
  {
    name: "X-Men '92",
    imageUrl:
      "https://i.annihil.us/u/prod/marvel/i/mg/b/80/62dab2a780bb2/portrait_uncanny.jpg",
    price: 9.99,
  },
  {
    name: "Venom",
    imageUrl:
      "https://i.annihil.us/u/prod/marvel/i/mg/a/20/62ed837a78bc9/portrait_uncanny.jpg",
    price: 3.99,
  },
  {
    name: "Captain America",
    imageUrl:
      "https://i.annihil.us/u/prod/marvel/i/mg/a/30/62ed839d90f4f/portrait_uncanny.jpg",
    price: 7.99,
  },
  {
    name: "Punisher",
    imageUrl:
      "https://i.annihil.us/u/prod/marvel/i/mg/6/b0/62ed837a6d417/portrait_uncanny.jpg",
    price: 3.99,
  },
  {
    name: "Black Panther",
    imageUrl:
      "https://i.annihil.us/u/prod/marvel/i/mg/3/10/62dab28445415/portrait_uncanny.jpg",
    price: 38.99,
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
    let user1 = await User.findByPk(1, { include: [{ model: Order }] });

    const order1 = await Order.create();
    await order1.setUser(user1);

    const energyDrink1 = await Item.findByPk(1);
    const energyDrink2 = await Item.findByPk(2);

    await order1.addItem(energyDrink1);
    await order1.addItem(energyDrink2);
    user1 = await User.findByPk(1, { include: { model: Order } });

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
