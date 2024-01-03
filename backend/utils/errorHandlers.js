function wrapAsync(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch(next);
    }
}
class ExpressError extends Error {

    constructor(status, message) {
        super();
        this.statusCode = status;
        this.message = message;
    }
}
module.exports = { wrapAsync, ExpressError }