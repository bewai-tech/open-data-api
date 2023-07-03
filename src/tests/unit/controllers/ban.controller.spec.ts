import BanController from '../../../controllers/ban.controller';
import { mockRequest, mockResponse, dbMock } from '../setupTest';

describe('BanController', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it('Should getAddress', async () => {
        const req = mockRequest({ query: { numero: '1', nom_voie: 'rue fake', code_postal: '11111' } });
        const res = mockResponse();

        await BanController.getAddress(req, res);

        expect(dbMock.oneOrNone).toHaveBeenCalledWith('SELECT * FROM ban WHERE numero = $1 AND nom_voie ILIKE \'%$2:value%\' AND code_postal = $3', ['1', 'rue fake', '11111']);
        expect(res.status).toHaveBeenCalledWith(200);
        // expect(res.status.send).toHaveBeenCalledWith([]);
        expect(res.send).toHaveBeenCalled();
    });

    it('Should getAddress and ignore non-allowed query params', async () => {
        const req = mockRequest({ query: { numero: '1', nonAllowedParam: 'fake' } });
        const res = mockResponse();

        await BanController.getAddress(req, res);

        expect(dbMock.oneOrNone).toHaveBeenCalledWith('SELECT * FROM ban WHERE numero = $1', ['1']);
        expect(res.status).toHaveBeenCalledWith(200);
        // expect(res.status.send).toHaveBeenCalledWith([]);
        expect(res.send).toHaveBeenCalled();
    });

    it('Should fail getAddress', async () => {
        const req = mockRequest({ query: { numero: '1', nonAllowedParam: 'fake' } });
        const res = mockResponse();

        jest.spyOn(dbMock, 'oneOrNone').mockImplementation(() => { throw new Error(); });

        await BanController.getAddress(req, res);

        expect(dbMock.oneOrNone).toThrow();
        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });

    it('Should fail getAddress (no query param)', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await BanController.getAddress(req, res);

        expect(dbMock.oneOrNone).not.toHaveBeenCalled();
        expect(res.sendStatus).toHaveBeenCalledWith(500);
    });

    it('Should count', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await BanController.count(req, res);

        expect(dbMock.one).toHaveBeenCalledWith('SELECT reltuples AS estimate FROM pg_class where relname = $1', ['ban']);
        expect(res.status).toHaveBeenCalledWith(200);
        // expect(res.status.send).toHaveBeenCalledWith({});
        expect(res.send).toHaveBeenCalled();
    });

    it('Should fail count', async () => {
        const req = mockRequest();
        const res = mockResponse();

        jest.spyOn(dbMock, 'one').mockImplementation(() => { throw new Error(); });

        await BanController.count(req, res);

        expect(dbMock.one).toThrow();
        expect(res.sendStatus).toHaveBeenCalledWith(404);
    });
});
