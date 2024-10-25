import { Request, Response } from 'express';
import { PhotoService } from './photo.service';

export const PhotoController = () => {

    const getPhotos = async (req: Request, res: Response): Promise<void> => {
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
            const result = await PhotoService.getPaginatedPhotos({
                page,
                limit,
                orderBy,
                order
            });

            res.json(result);
        } catch (error) {
            console.error('Controller Error:', error);
            res.status(500).json({
                error: 'Internal server error',
                message: error instanceof Error ? error.message : 'Unknown error'
            });
        }
    };

    return { getPhotos }
};
