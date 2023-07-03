import { Request, Response } from 'express';
import { db } from '../services';

class BanController {

    static getAddress = async (req: Request, res: Response) => {
        // List of allowed properties to query on
        const allowedQueryParams = [
            'id',
            'id_fantoir',
            'numero',
            'nom_voie',
            'code_postal',
            'code_insee',
            'nom_commune'
        ];

        // Query string appended to the original one with conditions
        let queryStr = '';

        if (!Object.keys(req.query)?.length) {
            res.sendStatus(500);
            return;
        } else {
            const paramKeys = Object.keys(req.query);

            // Dynamically build the query conditions based on query params
            paramKeys.forEach((key, index) => {

                // Ignore if query on non-allowed property
                if (!allowedQueryParams.includes(key)) {
                    return;
                }

                queryStr += queryStr?.length ? ' AND ' : '';

                // Non-strict comparison for text values
                if (key === 'nom_voie' || key === 'nom_commune') {
                    queryStr += `${key} ILIKE '%$${index + 1}:value%'`;
                } else {
                    queryStr += `${key} = $${index + 1}`;
                }
            });

        }

        let result;
        try {
            // Build an object only composed of allowed query params and their value
            const sanitizedQueryParams = Object.fromEntries(Object.entries(req.query).filter(([key]) => allowedQueryParams.includes(key)));

            result = await db.oneOrNone(`SELECT * FROM ban WHERE ${queryStr}`, Object.values(sanitizedQueryParams));
        } catch (error) {
            res.sendStatus(404);
            return;
        }

        res.status(200).send(result);
    };

    static count = async (req: Request, res: Response) => {
        let result;
        try {
            result = await db.one('SELECT reltuples AS estimate FROM pg_class where relname = $1', ['ban']);
        } catch (error) {
            res.sendStatus(404);
            return;
        }

        res.status(200).send(result);
    };
}

export default BanController;
