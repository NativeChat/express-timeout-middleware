'use strict';

// https://stackoverflow.com/questions/29011457/jasmine-jasmine-reporters-on-nodejs-missing-output

const Jasmine = require('jasmine');
const { JUnitXmlReporter, TerminalReporter } = require('jasmine-reporters');
const { existsSync, mkdirSync } = require('fs');



const addReporters = (jasmineEnv) => {
    const reportsPath = `${__dirname}/../reports`;
    if (!existsSync(reportsPath)) {
        mkdirSync(reportsPath);
    }

    const junitReporter = new JUnitXmlReporter({
        savePath: reportsPath,
        consolidateAll: false
    });

    jasmineEnv.addReporter(junitReporter);

    if (process.env.TERMINAL_REPORTER_ENABLED) {
        const terminalReporter = new TerminalReporter({
            color: true,
            verbosity: 3
        });

        jasmineEnv.addReporter(terminalReporter);
    }
};

module.exports = (jasmineConfigFile, configure) => {
    const jasmineEnv = new Jasmine();
    jasmineEnv.loadConfigFile(jasmineConfigFile);
    addReporters(jasmineEnv);

    if (configure && typeof configure === 'function') {
        configure(jasmine);
    }

    jasmineEnv.execute();
};
