import * as THREE from '../../../three/build/three.module.js';

export const rock = (() => {

    let i = 0;
    class rock {
        constructor(params) {
            let {
                scene,
                position,
            } = params;
            this.scene_ = scene;
            this.position_ = position;
            this.velocity_ = 0.0;

            this.LoadModel_();
        }

        LoadModel_() {

            let rock = new THREE.Object3D();


            let rockGo = new THREE.IcosahedronGeometry(3, 0);
            let rockMat = new THREE.MeshLambertMaterial({
                color: this.random_color(),
            });
            rock = new THREE.Mesh(rockGo, rockMat);


            this.scene_.add(rock);
            rock.position.copy(this.position_);
            rock.position
                .divideScalar(10)
                .floor()
                .multiplyScalar(10)
                .addScalar(1);
            rock.position.x += 2;
            rock.rotation.y = this.random_rotation();
            this.random_scale(rock)
            rock.castShadow = true;
            rock.receiveShadow = true;
            this.rock = rock;
            this.rock.name = "rock"
        }

        random_scale(rock) {
            let min = (0.2);
            let max = (0.5);
            let num = (Math.random() * (max - min)) + min;
            rock.scale.set((Math.random() * (max - min)) + min, num / 2, (Math.random() * (max - min)) + min)
            rock.position.y = num / 2;
        }

        random_color() {
            // 색상 변경 함수
            let rockcolor = [0xC7CAC5, 0x999999, 0x494949];
            let min = Math.ceil(0);
            let max = Math.floor(2);
            return rockcolor[(Math.floor(Math.random() * (max - min)) + min)];
        }

        random_rotation() {
            // 회전 변경 함수
            let min = Math.ceil(-2);
            let max = Math.floor(2);
            return Math.PI / (Math.floor(Math.random() * (max - min)) + min);
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
        rock: rock,
    };
})();