const gm = require('gm').subClass({imageMagick: true});

gm('img.jpg')
    .resize(100, 100)
    .toBuffer((err, buffer) => {
    if (err) return handle(err);
    console.log('done!');
}