import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Bird} from './bird';
import * as constants from 'constants';

@inject(EventAggregator)
export class BirdService {

    constructor(eventAggregator) {
        let self = this;

        self._birds = [];
        for(let i=0; i<constants.NOF_BIRDS; i++) {
            self._birds.push(new Bird());
        }

        eventAggregator.subscribe('vsync', canvas => {
            self._drawBirds(canvas);
        });
    }

    _drawBirds(canvas) {
        for(let bird of this._birds) {
            bird.draw(canvas);
        }
    }
}