// Vendor
import ResourceLoader from 'resource-loader';

// Loaders
import ThreeTextureLoader from 'loaders/three-texture-loader/src/index';
// import ThreeTextureLoader from 'loaders/three-texture-loader';

// Utils
import Debugger from 'utils/debugger';

// Config
import config from 'script/config';

// WebGL
import WebGLApplication from 'script/webgl';

class Application {
    constructor() {
        // Setup
        this._bindAll();

        this._resourceLoader = this._createResourceLoader();
        this._debugger = this._createDebugger();
        this._webglApplication = this._createWebGLApplication();

        this._setupEventListeners();
    }

    /**
     * Private
     */
    _createResourceLoader() {
        ResourceLoader.registerLoader(ThreeTextureLoader, 'texture');

        const resourceLoader = new ResourceLoader();
        resourceLoader.add({ resources: config.resources, preload: true });
        resourceLoader.preload();
        return resourceLoader;
    }

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

    _bindAll() {
        this._loadCompleteHandler = this._loadCompleteHandler.bind(this);
    }

    /**
     * Events
     */
    _setupEventListeners() {
        this._resourceLoader.addEventListener('complete', this._loadCompleteHandler);
    }

    /**
     * Handlers
     */
    _loadCompleteHandler() {
        this._webglApplication.start();
    }
}

export default Application;
