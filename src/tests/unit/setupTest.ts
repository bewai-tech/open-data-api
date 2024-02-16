import dotenv from 'dotenv';

// Setup environment variables for tests
dotenv.config({ path: '.env.test' });

process.env.APP_ENV = 'test';

export const mockRequest = (content: Record<string, unknown> = {}) => {
    const defaultRequest = {
        body: {},
        query: {},
        params: {},
        headers: {},
        ...content
    };

    return defaultRequest as any;
};

export const mockResponse = (mockedRes = {}) => {
    const res: any = mockedRes;
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);
    res.setHeader = jest.fn().mockReturnValue(res);
    res.sendStatus = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.type = jest.fn().mockReturnValue(res);

    return res;
};

jest.mock('pg-promise');

export const dbMock = {
    none: jest.fn().mockResolvedValue(null),
    any: jest.fn().mockResolvedValue([]),
    one: jest.fn().mockResolvedValue({}),
    oneOrNone: jest.fn().mockResolvedValue({}),
    many: jest.fn().mockResolvedValue([]),
    manyOrNone: jest.fn().mockResolvedValue([])
};

jest.mock('../../services', () => ({
    db: dbMock
}));

jest.mock('pg');

export const pgExecuteMock = jest.fn().mockResolvedValue(true);
jest.mock('../../helpers', () => ({
    Pg: {
        execute: pgExecuteMock
    }
}));

jest.mock('@sentry/node', () => {
    return {
        startTransaction: jest.fn().mockReturnValue({
            finish: jest.fn()
        }),
        captureException: jest.fn((e) => console.log(e))
    };
});
