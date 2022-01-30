import { UpdateDataService } from "./update-data.service";

export function initSynchronousFactory(updateDataService: UpdateDataService) {
    return () => {
        console.log('initSynchronousFactory');
        // run initialization code here
        updateDataService.setService();
    };
}