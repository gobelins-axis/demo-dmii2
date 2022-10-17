// Vendor
import { BoxGeometry, Mesh, MeshNormalMaterial, Object3D } from 'three';
import { component } from 'webgl/vendor/bidello';

export default class ComponentBox extends component(Object3D) {
    init(options = {}) {
        // Setup
        this._geometry = this._createGeometry();
        this._material = this._createMaterial();
        this._mesh = this._createMesh();
    }

    /**
     * Lifecycle
     */
    destroy() {
        super.destroy();
        this._geometry.dispose();
        this._material.dispose();
    }

    /**
     * Private
     */
    _createGeometry() {
        const geometry = new BoxGeometry(1, 1, 1);

        return geometry;
    }

    _createMaterial() {
        const material = new MeshNormalMaterial();

        return material;
    }

    _createMesh() {
        const mesh = new Mesh(this._geometry, this._material);
        this.add(mesh);
        return mesh;
    }

    /**
     * Update
     */
    onUpdate({ time, deltaTime, frame }) {
        this._mesh.rotation.x = time;
        this._mesh.rotation.y = time;
        this._mesh.rotation.z = time;
    }

    /**
     * Window Resize
     */
    onWindowResize(dimensions) {
        this._resize();
    }

    _resize() {
        this._mesh.scale.set(1, 1, 1);
    }
}
