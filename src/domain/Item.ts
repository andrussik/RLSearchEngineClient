import { ItemStatus } from "./ItemStatus";
import { Library } from "./Location";

export interface Item {
    id: string;
    publicationId: string;
    barCode: string;
    callNumber: string;
    location: Library;
    itemStatus: ItemStatus;
}