import { Item } from "./Item";
import { Language } from "./Language";
import { MaterialType } from "./MaterialType";

export interface Book {
    id: number;
    title: string;
    author: string;
    publishYear: number;

    lang: Language;
    materialType: MaterialType;

    items: Item[];
}