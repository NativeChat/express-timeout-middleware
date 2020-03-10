'use strict';

const { createMiddleware } = require('../../index');
const sinon = require('sinon');

const emptyNext = () => { };

const createStatusFunction = (expectedCode, expectedMessage) => {
    const status = sinon.spy((status) => {
        expect(status).toBe(expectedCode);
        return {
            json: (data) => {
                expect(data).toEqual({ message: expectedMessage });
            }
        };
    });

    return status;
};

describe('Middleware', () => {
    describe('createMiddleware', () => {
        it('should call next.', async () => {
            const next = sinon.spy();

            const middleware = createMiddleware();

            middleware(null, null, next);

            sinon.assert.calledOnce(next);
        });

        it('should set 503', async () => {
            const middleware = createMiddleware({ responseTimeout: 1000 });
            const res = {
                setTimeout: sinon.spy((timeout, handler) => {
                    expect(timeout).toBe(1000);

                    const s = { destroy: sinon.spy() };
                    handler(s);
                }),
                status: createStatusFunction(503, 'Service Unavailable')
            };

            middleware(null, res, emptyNext);

            sinon.assert.calledOnce(res.setTimeout);
            sinon.assert.calledOnce(res.status);
        });

        it('should set 408', async () => {
            const middleware = createMiddleware({ requestTimeout: 1000 });
            const req = {
                setTimeout: sinon.spy((timeout, handler) => {
                    expect(timeout).toBe(1000);

                    const s = { destroy: sinon.spy() };
                    handler(s);
                })
            };
            const res = {
                status: createStatusFunction(408, 'Request Timeout')
            };

            middleware(req, res, emptyNext);

            sinon.assert.calledOnce(req.setTimeout);
            sinon.assert.calledOnce(res.status);
        });
    });
});
