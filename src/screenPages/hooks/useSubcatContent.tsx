import { useState, useEffect } from "react";
import instance from "../../api/createApi";

export const useSubcategoryContent = (slug: string) => {
    const [subcategory, setSubcategory] = useState<any>(null);
    const [isLoading, setLoading] = useState(true);
    const [isError, setError] = useState(false);
    const [error, setErrorObj] = useState<Error | null>(null);

    useEffect(() => {
        const fetchSubcategory = async () => {
            try {
                const response = await instance.get(
                    `subcategories/bySlug/${slug}`
                );

                const data = response.data;

                if (data) {
                    setSubcategory(data);
                } else {
                    setError(true);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false);
                setError(true);
                setErrorObj(
                    error instanceof Error ? error : new Error("An error occurred")
                );
            }
        };

        fetchSubcategory();
    }, [slug]);

    return { subcategory, isLoading, isError, error };
};
export {};