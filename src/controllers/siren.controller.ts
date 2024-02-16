import { Request, Response } from 'express';
import { db } from '../services';

class SirenController {

    /**
     * Get all sirene paginated data or specific one with siret number
     * @returns the corresponding item
     */
    static checkSirene = async (req: Request, res: Response) => {
        const { siret, siren } = req.query as Record<any, string>;
        const limit = +req.query?.limit <= 100 ? +req.query?.limit : 100;
        const offset = +req.query?.offset || 0;

        let result;
        try {
            if (siret) {
                result = await db.one('SELECT * FROM sirene_etablissement WHERE siret = $1', [siret]);

                if (result) {
                    const unitelegale = await db.one('SELECT * FROM sirene_unitelegale WHERE siren = $1', [result.siren]);
                    result = {...result, ...unitelegale};
                }

            } else if (siren) {
                result = await db.one('SELECT * FROM sirene_unitelegale WHERE siren = $1', [siren]);

                if (result) {
                    result.siret = await db.manyOrNone('SELECT * FROM sirene_etablissement WHERE siren = $1', [result.siren]);
                }
            } else {
                // result = await db.any(`SELECT * FROM sirene LIMIT ${limit} OFFSET ${offset}`);
                res.json({message: 'Please add `siret` or `siren` query parameter.'});
            }
        } catch (error) {
            res.sendStatus(404);
            return;
        }

        res.status(200).send(result);
    };

    static count = async (req: Request, res: Response) => {
        const { method } = req.query;
        let result: any;

        try {

            if (method === 'estimate') {
                const estimates = await Promise.all([
                    db.one('SELECT reltuples AS estimate FROM pg_class where relname = $1', ['sirene_unitelegale']),
                    db.one('SELECT reltuples AS estimate FROM pg_class where relname = $1', ['sirene_etablissement'])
                ]);

                result = {
                    sirene_unitelegale: +estimates[0]?.estimate,
                    sirene_etablissement: +estimates[1]?.estimate
                };
            } else {
                const estimates = await Promise.all([
                    db.one('SELECT count(*) FROM sirene_unitelegale'),
                    db.one('SELECT count(*) FROM sirene_etablissement')
                ]);

                result = {
                    sirene_unitelegale: +estimates[0]?.count,
                    sirene_etablissement: +estimates[1]?.count
                };
            }

        } catch (error) {
            res.sendStatus(404);
            return;
        }

        res.status(200).send(result);
    };
}

export default SirenController;
