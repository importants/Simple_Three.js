import * as THREE from '../node_modules/three/build/three.module.js';

export const model = (() => {
    class model {
        constructor(params) {
            this.position_ = new THREE.Vector3(0, 0, 0);
            this.velocity_ = 0.0;
            this.params_ = params;
            this.LoadModel_();
            this.InitInput_();
        }

        LoadModel_() {
            let cubeGeometry = new THREE.BoxGeometry(5, 5, 5);
            let cubrMaterial = new THREE.MeshBasicMaterial({
                color: 0x1ac1c1
            })
            let cube = new THREE.Mesh(cubeGeometry, cubrMaterial);
            this.params_.scene.add(cube);
            this.mesh_ = cube;
        }

        InitInput_() {
            this.keys_ = {
                spacebar: false,
            };
            this.oldKeys = {
                ...this.keys_
            };

            document.addEventListener("keydown", (e) => this.OnKeyDown_(e), false);
            document.addEventListener("keyup", (e) => this.OnKeyUp_(e), false);
        }

        OnKeyDown_(event) {
            switch (event.keyCode) {
                case 32:
                    this.keys_.space = true;
                    break;
            }
        }

        OnKeyUp_(event) {
            switch (event.keyCode) {
                case 32:
                    this.keys_.space = false;
                    break;
            }
        }

        Update(timeElapsed) {
            if (this.keys_.space && this.position_.y == 0.0) {
                this.velocity_ = 30;
            }

            const acceleration = -60 * timeElapsed;

            this.position_.y += timeElapsed * (this.velocity_ + acceleration * 0.5);
            this.position_.y = Math.max(this.position_.y, 0.0);

            this.velocity_ += acceleration;
            this.velocity_ = Math.max(this.velocity_, -100);

            if (this.mesh_) {
                //this.mixer_.update(timeElapsed);
                this.mesh_.position.copy(this.position_);
                // =this.CheckCollisions_();
            }
        }
    }
    return {
        model: model,
    };
})();