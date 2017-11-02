import {inject} from 'aurelia-framework';
import * as JCanvas from 'jcanvas';
import {BirdService} from 'bird/bird-service';

@inject(BirdService)
export class App {
  constructor(bidrService) {

  }

  attached() {
    JCanvas.default($, window);
  }
}
