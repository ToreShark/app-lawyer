import { AxiosResponse } from 'axios';
import instance from "../api/createApi";

interface Subcategory {
    image: string;
    name: string;
    description: string;
}

interface ResponseData {
    subcategories: Subcategory[];
}
interface CarouselItem {
    imageUrl: string;
    title: string;
    description: string;
}
async function fetchCarouselItems(): Promise<CarouselItem[]> {
    try {
        const response: AxiosResponse<Subcategory[]> = await instance.get(`http://localhost:3000/api/subcategories`);
        const data: Subcategory[] = response.data;

        return data.map((subcategory) => ({
            imageUrl: subcategory.image,
            title: subcategory.name,
            description: subcategory.description,
        }));
    } catch (error) {
        console.error('Ошибка при получении данных:', error);
        return [];
    }
}

export default fetchCarouselItems;
