const Jimp = require('jimp');

async function createFavicon() {
  try {
    const image = await Jimp.create(32, 32, '#FFFFFF');
    await image.writeAsync('assets/favicon.png');
    console.log('Favicon created successfully!');
  } catch (err) {
    console.error('Error:', err);
  }
}

createFavicon();
