import { useQuery } from 'react-query';
import { Category } from '../interface/Category';
import instance from "../../api/createApi";

interface CategoryWithLink extends Category {
    link: string;
}

export const getCategoriesRequest = async () => {
    try {
        const response = await instance.get('categories');
        const categories = response.data.map((category: { name: any; }) => ({
            ...category,
            icon: `${category.name}Icon`
        }));
        return categories;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const useCategories = () => {
    const { data, isLoading, isError, error } = useQuery<Category[], Error>('categories', getCategoriesRequest);

    const categoriesWithLinks: CategoryWithLink[] | undefined = data?.map((category) => ({
        ...category,
        name: category.name,
        link: `/category/${category.slug}`,
    }));

    return {
        categories: categoriesWithLinks,
        isLoading,
        isError,
        error,
    };
};
