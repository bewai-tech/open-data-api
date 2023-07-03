import { initDepartementsFranceTable } from '../../../tables'
import { pgExecuteMock } from '../setupTest';

describe('DepartementsFrance table init', () => {
    it('Should init DepartementsFrance table', async () => {
        await initDepartementsFranceTable();

        expect(pgExecuteMock).toHaveBeenCalledTimes(2);
    });
});
