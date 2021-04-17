import * as THREE from '../../three/build/three.module.js';
export const cloud2 = (() => {

    let i = 0;
    class cloud2 {
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

            let cloud2 = new THREE.Object3D();


            let cloud2Go = new THREE.IcosahedronGeometry(10, 0);
            let cloud2Mat = null;
            let clouds = [];
            for (let i = 0; i < 5; i++) {
                cloud2Mat = new THREE.MeshLambertMaterial({
                    color: this.random_color(),
                    opacity: 0.3,
                    transparent: true,
                });
                clouds[i] = new THREE.Mesh(cloud2Go, cloud2Mat);
                cloud2.add(clouds[i]);
            }
            clouds[0].position.x = 5;
            clouds[0].position.y = -3;
            clouds[0].position.z = -10;
            clouds[0].scale.set(0.5, 0.5, 0.5)
            clouds[1].position.x = -8;
            clouds[1].position.y = -6;
            clouds[1].position.z = 10;
            clouds[1].scale.set(0.7, 0.7, 0.7)

            cloud2.scale.set(1, 0.6, 1)
            this.scene_.add(cloud2);
            cloud2.position.copy(this.position_);
            this.random_height(cloud2);
            cloud2.rotation.y = this.random_rotation();
            this.random_scale(cloud2)
            cloud2.castShadow = true;
            cloud2.receiveShadow = true;
            this.cloud2 = cloud2;

            this.cloud2.name = "cloud"
        }

        random_scale(cloud2) {
            let min = (0.6);
            let max = (2);
            let num2 = (Math.random() * (max - min)) + min;
            let num = (Math.random() * (max - min)) + min;
            cloud2.scale.set(num2, num / 3, num2);
        }

        random_color() {
            // 색상 변경 함수
            let cloud2color = [0xF5F5F5, 0xFFFFFF, 0xEAEAEA];
            let min = Math.ceil(0);
            let max = Math.floor(2);
            return cloud2color[(Math.floor(Math.random() * (max - min)) + min)];
        }

        random_rotation() {
            // 회전 변경 함수
            let min = Math.ceil(-2);
            let max = Math.floor(2);
            return Math.PI / (Math.floor(Math.random() * (max - min)) + min);
        }
        random_height(cloud2) {
            // 회전 변경 함수
            let min = Math.ceil(110);
            let max = Math.floor(130);
            cloud2.position.y = (Math.floor(Math.random() * (max - min)) + min);
        }

        /* animation */
        Update() {
            this.cloud2.position.x += 0.1;
        }
    }
    return {
        cloud2: cloud2,
    };
})();