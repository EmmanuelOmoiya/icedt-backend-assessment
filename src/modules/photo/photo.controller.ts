import { Request, Response } from 'express';
import { getPaginatedPhotos } from './photo.service';

export const getPhotos = async (req: Request, res: Response) => {
    try {
        // @ts-ignore
        const page = parseInt(req.query?.page as string) || 1;
        // @ts-ignore
        const limit = parseInt(req.query?.limit as string) || 10;
        // @ts-ignore
        const orderBy = (req.query?.orderBy as string) || 'id';
        // @ts-ignore
        const order = ((req.query.order as string)?.toLowerCase() === 'desc' ? 'desc' : 'asc') as 'asc' | 'desc';
        // @ts-ignore
        const result = await getPaginatedPhotos({ 
            page,
            limit,
            orderBy,
            order
        });

        res.status(200).send(result);
    } catch (error) {
        console.error('Controller Error:', error);
        res.status(500).send({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        });
    }
};

