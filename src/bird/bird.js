import {Container} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Navigation} from './navigation';
import * as constants from 'constants';

export class Bird {
    _listenTime = 0;
    _listenIgnore = constants.LISTEN_MIN_IGNORE_PERIOD + Math.random() * constants.LISTEN_MAX_IGNORE_PERIOD;
    _waitForNavigation = Math.random() * constants.LISTEN_MAX_WAIT_FOR_NAVIGATION;

    constructor() {
        let self = this;
        self._navigation = new Navigation(self);
        var eventAggregator = Container.instance.get(EventAggregator);
        eventAggregator.subscribe('navigation', navigation => {
            // don't listen to yourself
            if(navigation.getOwner() != self) {
                self.listen(navigation);
            }
        });
        self._setWaitForNavigationTimer();
    }

    _setWaitForNavigationTimer() {
        let self = this;
        if(self._waitForNavigationTimerId) {
            clearTimeout(self._waitForNavigationTimerId);
        }
        self._waitForNavigationTimerId = setTimeout(() => {
            self._navigation.newDirection();
        });
    }

    _navigationInRange(navigation) {
        let distance = this._navigation.calculateDistance(this._navigation.getPosition(), navigation.getPosition());
        return (distance <= constants.LISTEN_RADIUS);
    }

    listen(navigation) {
        let self = this;
        if(self._navigationInRange(navigation)) {
            self._setWaitForNavigationTimer();

            let now = new Date().getTime();
            // listen to the navigation if the listen ignore period is past
            if(now - this._listenIgnore > this._listenTime) {
                this._listenTime = now;
                this._navigation.setDirection(navigation.getDirection());
            }
        }
    }

    draw(canvas) {
        let pos = this._navigation.getPosition();

        $('canvas').drawArc({
            fillStyle: '#aaa',
            x: pos.x,
            y: pos.y,
            radius: 2
        });
    }        
}