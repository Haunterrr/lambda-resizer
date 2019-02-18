const gm = require('gm').subClass({imageMagick: true});
const s3 = require('./controllers/s3')


gm('cat.jpg')
    .resize(100, 100)
    .toBuffer((err, buffer) => {
    if (err) {
        console.log(err);
    } else {
        s3.putObject(buffer, "ansil-bucket-resize", "cat-resize.jpg")
    }
})