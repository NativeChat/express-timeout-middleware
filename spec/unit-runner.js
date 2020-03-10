'use strict';

const { join } = require('path');
const runner = require('./runner');

runner(join(__dirname, 'support', 'unit.json'));
