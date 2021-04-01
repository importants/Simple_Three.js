import * as THREE from '../three/build/three.module.js';

export const cloud1 = (() => {

    let i = 0;
    class cloud1 {
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

            let cloud1 = new THREE.Object3D();


            let cloud1Go = new THREE.IcosahedronGeometry(10, 0);
            let cloud1Mat = null;
            let clouds = [];
            for (let i = 0; i < 5; i++) {
                cloud1Mat = new THREE.MeshLambertMaterial({
                    color: this.random_color(),
                    opacity: 0.3,
                    transparent: true,
                });
                clouds[i] = new THREE.Mesh(cloud1Go, cloud1Mat);
                cloud1.add(clouds[i]);
            }
            clouds[0].position.x = 5;
            clouds[0].position.y = -3;
            clouds[0].position.z = -10;
            clouds[0].scale.set(0.5, 0.5, 0.5)
            clouds[1].position.x = -8;
            clouds[1].position.y = -6;
            clouds[1].position.z = 10;
            clouds[1].scale.set(0.7, 0.7, 0.7)
            clouds[2].position.x = 15;
            clouds[2].position.y = -3;
            clouds[2].position.z = -5;
            clouds[2].scale.set(0.9, 0.9, 0.9)
            clouds[3].position.x = -15;
            clouds[3].position.y = -7;
            clouds[4].scale.set(1.2, 1.2, 1.2)
            clouds[4].scale.set(1.5, 1.5, 1.5);
            cloud1.scale.set(1, 0.6, 1)
            this.scene_.add(cloud1);
            cloud1.position.copy(this.position_);
            this.random_height(cloud1);
            cloud1.rotation.y = this.random_rotation();
            //this.random_scale(cloud1)
            cloud1.castShadow = true;
            cloud1.receiveShadow = true;
            this.cloud1 = cloud1;
            this.cloud1.name = "cloud1"
        }

        random_scale(cloud1) {
            let min = (5);
            let max = (13);
            let num2 = (Math.random() * (max - min)) + min;
            let num3 = (Math.random() * (max - min)) + min;
            let num = (Math.random() * (max - min)) + min;
            cloud1.scale.set(num2, num / 3, num3);
        }

        random_color() {
            // 색상 변경 함수
            let cloud1color = [0xF5F5F5, 0xFFFFFF, 0xEAEAEA];
            let min = Math.ceil(0);
            let max = Math.floor(2);
            return cloud1color[(Math.floor(Math.random() * (max - min)) + min)];
        }

        random_rotation() {
            // 회전 변경 함수
            let min = Math.ceil(-2);
            let max = Math.floor(2);
            return Math.PI / (Math.floor(Math.random() * (max - min)) + min);
        }
        random_height(cloud1) {
            // 회전 변경 함수
            let min = Math.ceil(50);
            let max = Math.floor(60);
            cloud1.position.y = (Math.floor(Math.random() * (max - min)) + min);
        }

        /* animation */
        Update() {
            this.cloud1.position.x += 0.01;
        }
    }
    return {
        cloud1: cloud1,
    };
})();