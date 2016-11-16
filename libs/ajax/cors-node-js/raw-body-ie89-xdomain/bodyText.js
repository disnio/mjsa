module.exports = function() {
    var getBody = require('raw-body');

    return function(req, res, next) {

            // console.log(req.headers['content-type'])
        // If there's no content type, or it's text/plain, parse text
        // !req.headers['content-type'] || req.headers['content-type'].match('text/plain')
        if (req.accepts('text') === "text") {

            // flag as parsed
            req._body = true;
                // parse
            getBody(req, {
                limit: 100000, // something reasonable here
                expected: req.headers['content-length']
            }, function(err, buf) {
                if (err) return next(err);

                // Make string from buffer
                buf = buf.toString('utf8').trim();

                // Set body
                req.body = buf.length ? {
                    content: buf
                } : {}

                // Continue
                next();
            });
        }
    }
};
