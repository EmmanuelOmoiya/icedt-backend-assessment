import axios from 'axios';
import { Photo, IPhoto } from './photo.model';

export interface PaginationOptions {
    page: number;
    limit: number;
    orderBy: string;
    order: 'asc' | 'desc';
}

export interface PaginatedResponse {
    data: IPhoto[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}


export const fetchAndSaveData = async (): Promise<void> => {
        // let apiUrl = 'https://jsonplaceholder.typicode.com/photos';
        let dataStore = new Set();
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
            const photos = response.data;
            // @ts-ignore
            console.log('Response: ', response[3] )

            photos.forEach((item: any) => {
                dataStore.add(JSON.stringify(item));
            });

            const operations = photos.map((photo: any) => ({
                updateOne: {
                    filter: { id: photo.id, url: photo.url },
                    update: { $set: photo },
                    upsert: true
                }
            }));

            const result = await Photo.bulkWrite(operations);
            console.log(`Batch operation completed. Modified: ${result.modifiedCount}, Upserted: ${result.upsertedCount}`);
        } catch (error) {
            console.error('Error fetching and saving data:', error);
            // throw error;
            return;
            // return { "error": "Could not access `https://jsonplaceholder.typicode.com/photos` at this time, kindly chek your internet connection. " }
        }
    }

    export const getPaginatedPhotos = async (options: PaginationOptions): Promise<PaginatedResponse> => {
        const { page, limit, orderBy, order } = options;
        const skip = (page - 1) * limit;
        const sort = { [orderBy]: order === 'desc' ? -1 : 1 };

        const [data, totalItems] = await Promise.all([
            Photo.find()
            // @ts-ignore
                .sort(sort)
                .skip(skip)
                .limit(limit)
                .lean(),
            Photo.countDocuments()
        ]);

        const totalPages = Math.ceil(totalItems / limit);

        return {
            // @ts-ignore
            data,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems,
                itemsPerPage: limit,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1
            }
        };
    }

export const getMemoryPaginatedPhotos = (options: PaginationOptions) => {
        const { page, limit, orderBy, order } = options;
        // @ts-ignore
        const mpage = parseInt(page) || 1;
        // @ts-ignore
        const mlimit = parseInt(limit) || 10;
        const morderBy = orderBy || 'id';
        const morder = order?.toLowerCase() === 'desc' ? 'desc' : 'asc';
        
        // @ts-ignore
        let data = Array.from(dataStore).map(item => JSON.parse(item));

        
        data.sort((a, b) => {
            if (morder === 'asc') {
                return a[morderBy] > b[morderBy] ? 1 : -1;
            }
            return a[morderBy] < b[morderBy] ? 1 : -1;
        });
        
        const startIndex = (mpage - 1) * mlimit;
        const endIndex = mpage * mlimit;
        const totalItems = data.length;
        const totalPages = Math.ceil(totalItems / mlimit);
        
        const paginatedData = data.slice(startIndex, endIndex);
        
        const response = {
            data: paginatedData,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalItems: totalItems,
                itemsPerPage: limit,
                hasNextPage: endIndex < totalItems,
                hasPrevPage: startIndex > 0
            }
        };
        return response;
    }

