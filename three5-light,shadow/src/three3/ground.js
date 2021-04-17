import * as THREE from '../../three/build/three.module.js';

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
            const groundGeo = new THREE.BoxGeometry(100, 100, 4);
            const groundMat = new THREE.MeshLambertMaterial({
                color: this.random_color(),
            });

            const ground = new THREE.Mesh(groundGeo, groundMat);

            this.scene_.add(ground);
            ground.rotation.x = Math.PI / -2;
            ground.position.y = -2;
            ground.receiveShadow = true;
            this.ground_ = ground;
            // 위치this.tree_.position.copy(this.position_);
            this.ground_.name = "ground"


            const roadGeo = new THREE.BoxGeometry(20, 40, 1);
            const roadMat = new THREE.MeshLambertMaterial({
                color: 0xFBD494
            });

            const road = new THREE.Mesh(roadGeo, roadMat);
            road.receiveShadow = true;
            road.rotation.x = Math.PI / -2;
            road.position.z -= 30;
            this.scene_.add(road);



            const radiusTop = 25;

            const radiusBottom = 25;

            const height = 1.0;

            const radialSegments = 50;

            const geometry2 = new THREE.CylinderGeometry(
                radiusTop, radiusBottom, height, radialSegments);
            roadMat.flatShading = true;
            const Torusmat2 = new THREE.MeshLambertMaterial({
                color: 0xFBD494,
            });
            const plant2 = new THREE.Mesh(geometry2, Torusmat2);
            plant2.receiveShadow = true;
            plant2.position.z = 10;
            this.scene_.add(plant2);

            // 테두리
            const radius1 = 25.2;
            const tubeRadius1 = 0.3;
            const radialSegments1 = 3;
            const tubularSegments1 = 50;

            const Torusgeo = new THREE.TorusGeometry(
                radius1, tubeRadius1,
                radialSegments1, tubularSegments1);

            const Torusmat = new THREE.MeshLambertMaterial({
                color: 0xBDBDBD,
            });
            Torusmat.flatShading = true;
            const plant = new THREE.Mesh(Torusgeo, Torusmat);
            plant.receiveShadow = true;
            plant.rotation.x = Math.PI / -2;
            plant.rotation.x = Math.PI / -2;
            this.scene_.add(plant);
            plant.position.z = 10;


            const roadGeo1 = new THREE.BoxGeometry(0.5, 40, 0.7);
            const road1 = new THREE.Mesh(roadGeo1, Torusmat);
            road1.receiveShadow = true;
            road1.rotation.x = Math.PI / -2;
            road1.rotation.x = Math.PI / -2;
            road1.position.set(10.2, 0, -30)
            this.scene_.add(road1);

            const road2 = new THREE.Mesh(roadGeo1, Torusmat);
            road2.receiveShadow = true;
            road2.rotation.x = Math.PI / -2;
            road2.position.set(-10.2, 0, -30)
            this.scene_.add(road2);

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