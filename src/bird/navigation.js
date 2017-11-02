import {Container} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import * as constants from 'constants';

export class    Navigation {
    
    constructor(owner) {
        let self = this;

        self._owner = owner;
        
        self._eventAggregator = Container.instance.get(EventAggregator);

        self._x = Math.random() * constants.SCREEN_WIDTH;
        self._y = Math.random() * constants.SCREEN_HEIGHT;
        self._dx = 0;
        self._dy = 0;

        setInterval(() => {
            self.move(self);
        }, constants.MOVE_INTERVAL);
    }

    move(self) {
        self._x += self._dx;
        self._y += self._dy;

        if( self._x <= constants.SCREEN_BOUNDARY ) {
            self._x = constants.SCREEN_BOUNDARY;
            self._dx = Math.random() * constants.MAX_DELTA;
        }
        if( self._x >= constants.SCREEN_WIDTH - constants.SCREEN_BOUNDARY ) {
            self._x = constants.SCREEN_WIDTH - constants.SCREEN_BOUNDARY;
            self._dx = -(Math.random() * constants.MAX_DELTA);
        }
        if( self._y <= constants.SCREEN_BOUNDARY ) {
            self._y = constants.SCREEN_BOUNDARY;
            self._dy = Math.random() * constants.MAX_DELTA;
        }
        if( self._y >= constants.SCREEN_HEIGHT - constants.SCREEN_BOUNDARY ) {
            self._y = constants.SCREEN_HEIGHT - constants.SCREEN_BOUNDARY;
            self._dy = -(Math.random() * constants.MAX_DELTA);
        }
    }

    send() {
        this._eventAggregator.publish('navigation', this);
    }

    setDirection(direction) {
        let self =this;

        self._dx = direction.dx;
        self._dy = direction.dy;

        if(self._beakonId) {
            clearInterval(self._beakonId);
        }
        self._beakonId = setInterval(() => {
            self.send();
        }, constants.MIN_BEAKON_INTERVAL + Math.random() * constants.MAX_BEAKON_INTERVAL);
    }

    getOwner() {
        return this._owner;
    }

    getDirection() {
        return {
            dx: this._dx,
            dy: this._dy
        }
    }

    newDirection() {
        let dx = Math.random() * constants.MAX_DELTA;
        if(Math.random() < .5) {
            dx = -dx;
        }
        let dy = Math.random() * constants.MAX_DELTA;
        if(Math.random() < .5) {
            dy = -dy;
        }
        this.setDirection({
            dx: dx,
            dy: dy
        });
    }

    getPosition() {
        return {
            x: this._x,
            y: this._y
        }
    }

    calculateDistance(pos1, pos2) {
        let dx = Math.abs(pos1.x - pos2.x);
        let dy = Math.abs(pos1.y - pos2.y);
        return Math.sqrt(dx * dx + dy * dy);
    }
}