// Utils
import EventDispatcher from 'utils/EventDispatcher';
import device from 'utils/device';

const TAP_TRESHOLD = 2;

class DragManager extends EventDispatcher {
    constructor(options = {}) {
        super();

        this.el = options.el;
        this._touchStartPosition = { x: 0, y: 0 };
        this._touchPosition = { x: 0, y: 0 };

        this._dragDelta = { x: 0, y: 0 };

        this._enabled = true;

        this._isDraging = false;

        this._bindAll();
        this._setup();
    }

    /**
     * Getters & Setters
     */
    get enabled() {
        return this._enabled;
    }

    set enabled(value) {
        this._enabled = value;
    }

    /**
     * Public
     */
    destroy() {
        this._removeEventListeners();
    }

    /**
     * Private
     */
    _setup() {
        this._setupEventListeners();
    }

    _bindAll() {
        this._touchstartHandler = this._touchstartHandler.bind(this);
        this._touchmoveHandler = this._touchmoveHandler.bind(this);
        this._touchendHandler = this._touchendHandler.bind(this);
        this._mousedownHandler = this._mousedownHandler.bind(this);
        this._mousemoveHandler = this._mousemoveHandler.bind(this);
        this._mouseupHandler = this._mouseupHandler.bind(this);
    }

    _setupEventListeners() {
        if (device.isTouch()) {
            this.el.addEventListener('touchstart', this._touchstartHandler);
            window.addEventListener('touchmove', this._touchmoveHandler);
            window.addEventListener('touchend', this._touchendHandler);
        } else {
            this.el.addEventListener('mousedown', this._mousedownHandler);
            window.addEventListener('mousemove', this._mousemoveHandler);
            window.addEventListener('mouseup', this._mouseupHandler);
        }
    }

    _removeEventListeners() {
        if (device.isTouch()) {
            this.el.removeEventListener('touchstart', this._touchstartHandler);
            window.removeEventListener('touchmove', this._touchmoveHandler);
            window.removeEventListener('touchend', this._touchendHandler);
        } else {
            this.el.removeEventListener('mousedown', this._mousedownHandler);
            window.removeEventListener('mousemove', this._mousemoveHandler);
            window.removeEventListener('mouseup', this._mouseupHandler);
        }
    }

    /**
     * Handlers
     */
    _dragstartHandler(e) {
        if (!this._enabled) return;
        this.dispatchEvent('dragstart', e);
    }

    _dragHandler(e) {
        if (!this._enabled) return;
        this.dispatchEvent('drag', e);
    }

    _dragendHandler(e) {
        if (!this._enabled) return;
        this.dispatchEvent('dragend', e);
    }

    _tapHandler(e) {
        if (!this._enabled) return;
        this.dispatchEvent('tap', e);
    }

    _touchdownHandler(e) {
        if (!this._enabled) return;
        this.dispatchEvent('touchdown', e);
    }

    _touchupHandler(e) {
        if (!this._enabled) return;
        this.dispatchEvent('touchup', e);
    }

    // Mouse
    _mousedownHandler(e) {
        this._isDraging = true;

        const position = {
            x: e.clientX,
            y: e.clientY,
        };

        const delta = { x: 0, y: 0 };

        this._touchPosition.x = position.x;
        this._touchPosition.y = position.y;

        this._touchStartPosition.x = position.x;
        this._touchStartPosition.y = position.y;

        this._touchdownHandler({ position, delta });
        this._dragstartHandler({ position, delta });
    }

    _mousemoveHandler(e) {
        if (!this._isDraging) return;

        const position = {
            x: e.clientX,
            y: e.clientY,
        };

        const delta = {
            x: this._touchPosition.x - position.x,
            y: this._touchPosition.y - position.y,
        };

        this._touchPosition.x = position.x;
        this._touchPosition.y = position.y;

        this._dragDelta.x = delta.x;
        this._dragDelta.y = delta.y;

        this._dragHandler({ position, delta });
    }

    _mouseupHandler() {
        const position = this._touchPosition;
        const delta = this._dragDelta;

        if (this._isDraging && Math.abs(position.x - this._touchStartPosition.x) < TAP_TRESHOLD && Math.abs(position.y - this._touchStartPosition.y) < TAP_TRESHOLD) {
            this._tapHandler({ position, delta });
        } else {
            this._dragendHandler({ position, delta });
        }

        this._isDraging = false;

        this._touchupHandler({ position, delta });
    }

    // Touch
    _touchstartHandler(e) {
        this._isDraging = true;

        const position = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };

        const delta = { x: 0, y: 0 };

        this._touchPosition.x = position.x;
        this._touchPosition.y = position.y;

        this._touchStartPosition.x = position.x;
        this._touchStartPosition.y = position.y;

        this._touchdownHandler({ position, delta });
        this._dragstartHandler({ position, delta });
    }

    _touchmoveHandler(e) {
        if (!this._isDraging) return;

        const position = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY,
        };

        const delta = {
            x: this._touchPosition.x - position.x,
            y: this._touchPosition.y - position.y,
        };

        this._touchPosition.x = position.x;
        this._touchPosition.y = position.y;

        this._dragDelta.x = delta.x;
        this._dragDelta.y = delta.y;

        this._dragHandler({ position, delta });
    }

    _touchendHandler() {
        const position = this._touchPosition;
        const delta = this._dragDelta;

        if (this._isDraging && Math.abs(position.x - this._touchStartPosition.x) < TAP_TRESHOLD && Math.abs(position.y - this._touchStartPosition.y) < TAP_TRESHOLD) {
            this._tapHandler({ position, delta });
        } else {
            this._dragendHandler({ position, delta });
        }

        this._isDraging = false;

        this._touchupHandler({ position, delta });
    }
}

export default DragManager;
