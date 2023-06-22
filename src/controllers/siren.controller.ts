import { Request, Response } from 'express';
import { db } from '../services';

class SirenController {

    /**
     * Get all sirene paginated data or specific one with siret number
     * @returns the corresponding item(s)
     */
    static checkSirene = async (req: Request, res: Response) => {
        const { siret } = req.query as Record<any, string>;
        const limit = +req.query?.limit <= 100 ? +req.query?.limit : 100;
        const offset = +req.query?.offset || 0;

        let result;
        try {
            if (!siret) {
                result = await db.any(`SELECT * FROM sirene LIMIT ${limit} OFFSET ${offset}`);
            } else {
                result = await db.one('SELECT * FROM sirene WHERE siret = $1', [siret]);
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
