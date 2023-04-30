import {Subcategory} from "./Subcategory";

export interface Category {
    slug: any;
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    link: string;
    label: string;
    subcategories: Subcategory[];
}