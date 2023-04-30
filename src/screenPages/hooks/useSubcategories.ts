import { useQuery } from "react-query";
import { Category } from "../interface/Category";
import { Subcategory } from "../interface/Subcategory";
import {getCategoriesRequest} from "./useCategories";

export const useSubcategories = (slug: string) => {
    const {
        data: categories,
        isLoading,
        isError,
        error,
    } = useQuery<Category[], Error>("categories", getCategoriesRequest);

    console.log("categories", categories);

    const category = categories?.find(
        (category: Category) => category.slug === slug
    );

    console.log("category", category);

    const subcategories: Subcategory[] | undefined = category?.subcategories;



    return {
        subcategories: subcategories || [],
        isLoading,
        isError,
        error,
    };
};

export {};
