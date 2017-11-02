import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import * as constants from 'constants';

@inject(EventAggregator)
export class DisplayService {

    _visibleViewer = 1;

    constructor(eventAggregator) {
        this._eventAggregator = eventAggregator;
    }

    init() {
        let self = this;
        /**
         * Create two div's with canvases in them to draw on.
         */
        var dimensionStyle = 'style="width: ' + constants.SCREEN_WIDTH + 'px; height: ' + constants.SCREEN_HEIGHT + 'px;"';
        var viewer1 = $('<div id="viewer0" class="viewer" ' + dimensionStyle + '><canvas width="' + constants.SCREEN_WIDTH + '" height="' + constants.SCREEN_HEIGHT + '"></canvas></div>');    
        var viewer2 = $('<div id="viewer1" class="viewer" ' + dimensionStyle + '><canvas width="' + constants.SCREEN_WIDTH + '" height="' + constants.SCREEN_HEIGHT + '"></canvas></div>');    
        $('#displayContainer').append(viewer1);
        $('#displayContainer').append(viewer2);

        setInterval(function() {
            self.vSync();
        }, 50);
    }

    vSync() {
        $('#viewer' + this._visibleViewer).hide();
        var hiddenCanvas = $($('#viewer' + this._visibleViewer + ' canvas'));
        this._visibleViewer = (this._visibleViewer + 1) % 2;
        $('#viewer' + this._visibleViewer).show();
        hiddenCanvas.clearCanvas();
        this._eventAggregator.publish('vsync', hiddenCanvas);
    }
}