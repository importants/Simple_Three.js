import * as THREE from '../node_modules/three/build/three.module.js';

export const meshs = (() => {
    class meshs {
        constructor(params) {
            let {
                scene,
                position,

            } = params;
            this.position_ = position;
            this.scene_ = scene;
            // new THREE.Vector3(10, 10, 10);
            this.velocity_ = 0.0;

            this.LoadModel_();
        }

        LoadModel_() {
            let cubeGeometry = null;
            cubeGeometry = new THREE.BoxGeometry(10, 10, 10);
            let cubrMaterial = new THREE.MeshBasicMaterial({
                color: this.random_color()
            })
            let cube = new THREE.Mesh(cubeGeometry, cubrMaterial);
            this.scene_.add(cube); // main의 scene에 추가
            this.mesh_ = cube;
            this.mesh_.position.copy(this.position_);
            this.mesh_.name = "mesh"
        }


        random_color() {
            // 위치 변경 함수
            let color = ['#5BE7F7', '#43AFBB', '#348791'];
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
        meshs: meshs,
    };
})();