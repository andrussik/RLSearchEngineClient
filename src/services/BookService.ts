import { Book } from "../domain/Book";
import { ServiceApi } from "./ServiceApi";

export const BookService = {
    async getBooks(searchString: string): Promise<Book[]> {
        const url = "https://localhost:5001/Book/" + searchString;
        const response: Book[] = await ServiceApi.get(url);

        return response;
    },

    async getBooksElastic(searchString: string): Promise<Book[]> {
        const url = "https://localhost:5001/Search/Elastic/" + searchString;
        const response: Book[] = await ServiceApi.get(url);

        return response;
    },

    async getElasticIndexResult(searchString: string): Promise<Book[]> {
        const url = "https://localhost:5001/Book/Elastic/" + searchString;
        const response: Book[] = await ServiceApi.get(url);

        return response;
    },

    async getBooksSolr(searchString: string): Promise<Book[]> {
        const url = "https://localhost:5001/Book/Solr/" + searchString;
        const response: Book[] = await ServiceApi.get(url);

        return response;
    },

    async getBooksAzureSearch(searchString: string): Promise<Book[]> {
        const url = "https://localhost:5001/Book/AzureCognitiveSearch/" + searchString;
        const response: Book[] = await ServiceApi.get(url);

        return response;
    },
};