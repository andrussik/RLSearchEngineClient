import axios from "axios";

export const ServiceApi = {
    async get(url: string): Promise<any> {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin" : "*"
            },
        });

        if (!response.ok) {
            console.log(response);
            return response;
        }

        return response.json();
    },

    async post(url: string, body: any): Promise<any> {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            console.log(response);
            return response;
        }

        return response.json();
    },

    // async put(
    //     url: string,
    //     entity: TEntity,
    //     jwt: string | null
    // ): Promise<IFetchResponse<TEntity>> {
    //     try {
    //         const response = await this.axios.put<TEntity>(
    //             url,
    //             JSON.stringify(entity),
    //             {
    //                 headers: {
    //                     Authorization: "Bearer " + jwt,
    //                 },
    //             }
    //         );
    //         console.log("put response", response);

    //         return {
    //             data: response.data,
    //             statusCode: response.status,
    //             statusText: response.statusText,
    //             errorMessage: null,
    //         };
    //     } catch (error) {
    //         console.log(error);

    //         return {
    //             data: null,
    //             statusCode: error.response.status,
    //             statusText: error.response.statusText,
    //             errorMessage: error.message,
    //         };
    //     }
    // },

    // async delete(
    //     url: string,
    //     jwt: string | null
    // ): Promise<IFetchResponse<TEntity>> {
    //     try {
    //         const response = await this.axios.delete<TEntity>(url, {
    //             headers: {
    //                 Authorization: "Bearer " + jwt,
    //             },
    //         });
    //         console.log("delete response", response);

    //         return {
    //             data: response.data,
    //             statusCode: response.status,
    //             statusText: response.statusText,
    //             errorMessage: null,
    //         };
    //     } catch (error) {
    //         console.log(error);

    //         return {
    //             data: null,
    //             statusCode: error.response.status,
    //             statusText: error.response.statusText,
    //             errorMessage: error.message,
    //         };
    //     }
    // }
};
