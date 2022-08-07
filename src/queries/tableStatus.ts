import {
    ReleaseTable
    
} from '@/models/release_table';


import {GetApi,PostApi} from "@/utils/requests"


class TableApi {

    public async postReleaseTable(tableStatus:ReleaseTable){
        return (await PostApi("OrderDish/PostUpdateTable",tableStatus)).statusText as string;
    }

}

export const tableApi = new TableApi();



