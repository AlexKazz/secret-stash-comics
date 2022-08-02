const { green, red } = require('chalk');
const { db, User, Item } = require('./server/db');

const items = [
  {
    name: 'Spiderman',
    imageUrl: '',
    price: 99.99,
  },
];

const users = [
  {
    username: 'ComicBookGuy42069',
    password: 'password123',
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });

    await Promise.all(
      items.map((item) => {
        return Item.create(item);
      })
    );
    await Promise.all(
      users.map((user) => {
        return User.create(user);
      })
    );

    console.log(green('Seeding success!'));
    db.close();
  } catch (err) {
    console.log(red(err));
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Oh noes! Something went wrong!'));
      console.error(err);
      db.close();
    });
}
