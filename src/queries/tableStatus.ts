import {
    ReleaseTable
    
} from '@/models/release_table';


import {GetApi,PostApi, PutApi} from "@/utils/requests"


class TableApi {

    public async postReleaseTable(tableStatus:ReleaseTable){
        return (await PutApi("tableStatus",tableStatus)).statusText as string;
    }

}

export const tableApi = new TableApi();



