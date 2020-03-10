# express-timeout-middleware
Module which provides timeout express middleware.

## Usage
```JavaScript
const { createMiddleware } = require('express-timeout-middleware');

const middleware = createMiddleware({ requestTimeout: 60000, responseTimeout: 60000});
```
