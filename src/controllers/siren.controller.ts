import { Request, Response } from 'express';
import { db } from '../services';

class SirenController {

    /**
     * Dynamically checks SIREN or SIRET number depending on the parameter's length.
     * SIREN string length is 9 (multiple occurences could be found).
     * SIRET string length is 14 (unique occurence could be found).
     * @returns the corresponding items
     */
    static checkSirene = async (req: Request, res: Response) => {
        const { siren, siret } = req.query as Record<any, string>;
        const limit = +req.query?.limit <= 100 ? +req.query?.limit : 100;
        const offset = +req.query?.offset || 0;

        let result;
        try {
            if (!siren && !siret) {
                result = await db.any(`SELECT * FROM sirene LIMIT ${limit} OFFSET ${offset}`);
            } else {
                result = await db.any(
                    `SELECT * FROM sirene WHERE ${!siren ? 'siret' : 'siren'} IN ($1:csv) LIMIT ${limit} OFFSET ${offset}`,
                    [!siren ? siret.split(',') : siren.split(',')]
                );
            }
        } catch (error) {
            res.status(404).send(error);
            return;
        }

        res.status(200).send(result);
    };

    static count = async (req: Request, res: Response) => {
        let result;
        try {
            result = await db.one('SELECT reltuples AS estimate FROM pg_class where relname = $1', ['sirene']);
        } catch (error) {
            res.status(404).send(error);
            return;
        }

        res.status(200).send(result);
    };
}

export default SirenController;
