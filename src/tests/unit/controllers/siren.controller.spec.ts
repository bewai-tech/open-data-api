import SirenController from '../../../controllers/siren.controller';
import { mockRequest, mockResponse, dbMock } from '../setupTest';

describe('SirenController', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it('Should checkSiren', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await SirenController.checkSirene(req, res);

        expect(dbMock.any).toHaveBeenCalledWith('SELECT * FROM sirene LIMIT 100 OFFSET 0');
        expect(dbMock.one).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        // expect(res.status.send).toHaveBeenCalledWith([]);
        expect(res.send).toHaveBeenCalled();
    });

    it('Should checkSiren (with custom limit and offset)', async () => {
        const req = mockRequest({ query: { limit: 100000, offset: 100 } });
        const res = mockResponse();

        await SirenController.checkSirene(req, res);

        expect(dbMock.any).toHaveBeenCalledWith('SELECT * FROM sirene LIMIT 100 OFFSET 100');
        expect(dbMock.one).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        // expect(res.status.send).toHaveBeenCalledWith([]);
        expect(res.send).toHaveBeenCalled();
    });

    it('Should checkSiren (by siret number)', async () => {
        const req = mockRequest({ query: { siret: '123' } });
        const res = mockResponse();

        await SirenController.checkSirene(req, res);

        expect(dbMock.one).toHaveBeenCalledWith('SELECT * FROM sirene WHERE siret = $1', ['123']);
        expect(dbMock.any).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        // expect(res.status.send).toHaveBeenCalledWith({});
        expect(res.send).toHaveBeenCalled();
    });

    it('Should fail checkSiren', async () => {
        const req = mockRequest();
        const res = mockResponse();

        jest.spyOn(dbMock, 'any').mockImplementation(() => { throw new Error(); });

        await SirenController.checkSirene(req, res);

        expect(dbMock.any).toThrow();
        expect(dbMock.one).not.toHaveBeenCalled();
        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('Should count', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await SirenController.count(req, res);

        expect(dbMock.one).toHaveBeenCalledWith('SELECT reltuples AS estimate FROM pg_class where relname = $1', ['sirene']);
        expect(res.status).toHaveBeenCalledWith(200);
        // expect(res.status.send).toHaveBeenCalledWith({});
        expect(res.send).toHaveBeenCalled();
    });

    it('Should fail count', async () => {
        const req = mockRequest();
        const res = mockResponse();

        jest.spyOn(dbMock, 'one').mockImplementation(() => { throw new Error(); });

        await SirenController.count(req, res);

        expect(dbMock.one).toThrow();
        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
});
