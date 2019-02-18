const gm = require('gm').subClass({imageMagick: true});
const s3 = require('./controllers/s3')


exports.handler = (event, context) => {

    // Source Bucket
    const srcBucket = event.Records[0].s3.bucket.name;

    // Dst Bucket
    const dstBucket = `${srcBucket}-resize`

    // Key
    const key = event.Records[0].s3.object.key

    s3.getObject(srcBucket, key)
    .then((data) => {
        gm(data.Body)
        .resize(100, 100)
        .toBuffer((err, data) => {
            if (err) {
                context.fail(err);
            } else {
                s3.putObject(data, dstBucket, key)
                    .then(() => {
                        context.done(null, "Complete")
                    })
                    .catch((err) => {
                        context.fail(err);
                    })
            }
        })
    })
    .catch((err) => {
        context.fail(err);
    })