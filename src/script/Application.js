// Utils
import Debugger from 'utils/debugger';

// Config
import config from 'script/config';

// WebGL
import WebGLApplication from 'script/webgl';

class Application {
    constructor() {
        // Setup
        this._debugger = this._createDebugger();
        this._webglApplication = this._createWebGLApplication();
        this._webglApplication.start();
    }

    /**
     * Private
     */
    _createDebugger() {
        const debug = new Debugger();
        return debug;
    }

    _createWebGLApplication() {
        const webglApplication = new WebGLApplication({
            canvas: document.querySelector('.js-canvas'),
            debugger: this._debugger,
        });
        return webglApplication;
    }
}

export default Application;
