'use strict';

const { STATUS_CODES } = require('http');

const createMiddleware = (options) => {
    const opts = options || {};
    const middleware = (req, res, next) => {
        if (opts.requestTimeout !== undefined) {
            req.setTimeout(opts.requestTimeout, () => {
                res.status(408).json({ message: STATUS_CODES[408] });
            });
        }

        if (opts.responseTimeout !== undefined) {
            res.setTimeout(opts.responseTimeout, (s) => {
                res.status(503).json({ message: STATUS_CODES[503] });
                s.destroy();
            });
        }

        next();
    };

    return middleware;
};

module.exports = { createMiddleware };
