import { initSireneTable } from '../../../tables'
import { pgExecuteMock } from '../setupTest';

describe('Sirene table init', () => {
    it('Should init sirene table', async () => {
        await initSireneTable();

        expect(pgExecuteMock).toHaveBeenCalledTimes(2);
    });
});
