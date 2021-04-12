import * as THREE from '../../../three/build/three.module.js';

export const round = (() => {

    let i = 0;
    class round {
        constructor(params) {
            let {
                scene,
                position,
                rotation,
                object,
            } = params;
            this.scene_ = scene;
            this.position_ = position;
            this.rotation_ = rotation;
            // new THREE.Vector3(10, 10, 10);
            this.velocity_ = 0.0;
            this.object_ = object;
            this.LoadModel_();
        }

        LoadModel_() {




            const roundGeo = new THREE.BoxGeometry(221, 1, 16);
            const roundMat = new THREE.MeshLambertMaterial({
                color: 0xE4E4E4,
                opacity: 0.7,
                transparent: true,
            });

            const round = new THREE.Mesh(roundGeo, roundMat);

            this.scene_.add(round);
            round.rotation.x = Math.PI / -2;
            round.rotation.z = this.rotation_;
            round.castShadow = false;
            round.receiveShadow = true;
            this.round_ = round;
            this.round_.position.copy(this.position_);
            round.position.y = 8;
            this.round_.name = "round"
            this.object_.push(this.round_);
        }

        /* animation */
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
                this.mesh_.position.copy(this.position_);
            }
        }
    }
    return {
        round: round,
    };
})();