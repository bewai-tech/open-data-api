import DepartementsFrController from '../../../controllers/departementsFr.controller';
import { mockRequest, mockResponse, dbMock } from '../setupTest';

describe('DepartementsFrController', () => {
    beforeEach(() => {
        jest.resetModules();
        jest.resetAllMocks();
    });

    it('Should getDepartements', async () => {
        const req = mockRequest();
        const res = mockResponse();

        await DepartementsFrController.getDepartements(req, res);

        expect(dbMock.any).toHaveBeenCalledWith('SELECT * FROM departementsfr');
        expect(dbMock.oneOrNone).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        // expect(res.status.send).toHaveBeenCalledWith([]);
        expect(res.send).toHaveBeenCalled();
    });

    it('Should getDepartements (by code_departement)', async () => {
        const req = mockRequest({ query: { code_departement: '123' } });
        const res = mockResponse();

        await DepartementsFrController.getDepartements(req, res);

        expect(dbMock.oneOrNone).toHaveBeenCalledWith('SELECT * FROM departementsfr WHERE code_departement = $1', ['123']);
        expect(dbMock.any).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        // expect(res.status.send).toHaveBeenCalledWith([]);
        expect(res.send).toHaveBeenCalled();
    });
});
