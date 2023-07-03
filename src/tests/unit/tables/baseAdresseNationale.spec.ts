import { initBaseAdresseNationale } from '../../../tables'
import { pgExecuteMock } from '../setupTest';

describe('BaseAdresseNationale table init', () => {
    it('Should init BaseAdresseNationale table', async () => {
        await initBaseAdresseNationale();

        expect(pgExecuteMock).toHaveBeenCalledTimes(2);
    });
});
