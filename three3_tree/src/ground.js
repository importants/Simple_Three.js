import * as THREE from '../three/build/three.module.js';

export const ground = (() => {

    let i = 0;
    class ground {
        constructor(params) {
            let {
                scene,


            } = params;
            this.scene_ = scene;
            // new THREE.Vector3(10, 10, 10);
            this.velocity_ = 0.0;

            this.LoadModel_();
        }

        LoadModel_() {




            const groundGeo = new THREE.BoxGeometry(220, 220, 4);
            const groundMat = new THREE.MeshLambertMaterial({
                color: this.random_color(),
            });

            const ground = new THREE.Mesh(groundGeo, groundMat)

            this.scene_.add(ground);
            ground.rotation.x = Math.PI / -2;
            ground.position.y = -2;
            this.ground_ = ground;
            // 위치this.tree_.position.copy(this.position_);
            this.ground_.name = "ground"

        }


        random_color() {
            // 위치 변경 함수
            let color = [0xAEDE24, 0xB0E712, 0xC6F04D];
            let min = Math.ceil(0);
            let max = Math.floor(2);
            return color[Math.floor(Math.random() * (max - min)) + min];
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
        ground: ground,
    };
})();