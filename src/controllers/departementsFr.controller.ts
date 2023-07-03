import { Request, Response } from 'express';
import { db } from '../services';

class DepartementsFrController {

    /**
     * Get the full list of french departements or one departement by its `code_departement`
     * @returns the corresponding french departements items
     */
    static getDepartements = async (req: Request, res: Response) => {
        const { code_departement } = req.query;

        let result;
        try {
            if (code_departement) {
                result = await db.oneOrNone('SELECT * FROM departementsfr WHERE code_departement = $1', [code_departement]);
            } else {
                result = await db.any('SELECT * FROM departementsfr');
            }
        } catch (error) {
            res.sendStatus(404);
            return;
        }

        res.status(200).send(result);
    };
}

export default DepartementsFrController;
