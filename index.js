const gm = require('gm').subClass({imageMagick: true});
const s3 = require('./controllers/s3')


s3.getObject("ansil-bucket", "cat.jpg")
    .then((data) => {
        gm(data.Body)
        .resize(100, 100)
        .toBuffer((err, buffer) => {
        if (err) {
            console.log(err);
        } else {
            s3.putObject(data, "ansil-bucket-resize", "cat-resize.jpg")
        }
    })
    })
