import {inject} from "aurelia-framework";
import {DisplayService} from "display/display-service";

@inject(DisplayService)
export class Display {
    constructor(displayService) {
        this._displayService = displayService;
    }

    attached() {
        this._displayService.init();
    }
}