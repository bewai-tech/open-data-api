import { Request, Response } from 'express';
import { ParameterizedQuery } from 'pg-promise';

import { db, pgp } from '../services';

class DepartementsFrController {

    /**
     * Get the full list of french departements or one departement by its `code_departement`
     * @returns the corresponding french departements items
     */
    static getDepartements = async (req: Request, res: Response) => {
        const { code_departement } = req.query;

        // Build
        let pq: ParameterizedQuery;
        if (code_departement) {
            pq = new pgp.ParameterizedQuery({ text: 'SELECT * FROM departementsfr WHERE code_departement = $1', values: [code_departement] });
        } else {
            pq = new pgp.ParameterizedQuery({ text: 'SELECT * FROM departementsfr' });
        }

        let result;
        try {
            if (code_departement) {
                result = await db.oneOrNone(pq);
            } else {
                result = await db.any(pq);
            }
        } catch (error) {
            res.status(404).send(error);
            return;
        }

        res.status(200).send(result);
    };
}

export default DepartementsFrController;
