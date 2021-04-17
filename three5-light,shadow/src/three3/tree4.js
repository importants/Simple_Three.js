import * as THREE from '../../three/build/three.module.js';


export const tree4 = (() => {

    let i = 0;
    class tree4 {
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

            let tree4 = new THREE.Object3D();

            let trunks = [];
            let trunk_position = [];
            let trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 6, 5);
            let trunkMat = new THREE.MeshLambertMaterial({
                color: 0X6F441B,
            });
            for (i = 0; i < 2; i++) {
                trunks[i] = new THREE.Mesh(trunkGeo, trunkMat);
                trunk_position[i] = new THREE.Object3D();
                tree4.add(trunk_position[i]);
                trunks[i].position.y = 5;
                trunk_position[i].add(trunks[i]);
                trunks[i].castShadow = true;
            }

            let leafGo = new THREE.IcosahedronGeometry(2);
            let leafMat = null;

            let leafs = [];
            for (i = 1; i < 6; i++) {
                leafMat = new THREE.MeshLambertMaterial({
                    color: this.random_color(),
                });
                leafs[i] = new THREE.Mesh(leafGo, leafMat);
                leafs[i].castShadow = true;
            }

            trunk_position[0].position.y = 0;
            trunks[0].position.y = 3;
            trunks[0].rotation.x = Math.PI / 0.505;
            trunks[0].scale.set(1, 1.2, 1);

            leafs[1].position.set(0, 5.5, 1);
            leafs[1].scale.set(0.8, 0.8, 0.8);
            trunk_position[0].add(leafs[1]);

            leafs[2].position.set(0, 6, -1);
            leafs[2].scale.set(1, 1, 1.2);
            trunk_position[0].add(leafs[2]);

            leafs[3].position.set(1, 5.0, 1);
            leafs[3].scale.set(1, 1, 1);
            trunk_position[0].add(leafs[3]);

            trunk_position[1].position.y = 2;
            trunk_position[1].rotation.x = Math.PI / 3;
            trunks[1].position.y = 1;
            trunks[1].scale.set(0.3, 0.3, 0.3);

            leafs[4].position.set(0, 2.5, 0);
            leafs[4].scale.set(0.5, 0.5, 0.5);
            leafs[5].position.set(0.5, 2, 0);
            leafs[5].scale.set(0.3, 0.3, 0.3);
            for (i = 4; i < 6; i++) {
                trunk_position[1].add(leafs[i]);
            }





            this.scene_.add(tree4);
            tree4.position.copy(this.position_);
            tree4.position
                .divideScalar(6)
                .floor()
                .multiplyScalar(6)
                .addScalar(3);
            tree4.rotation.y = this.random_rotation();
            this.random_scale(tree4)
            this.tree_ = tree4;
            tree4.castShadow = true;
            tree4.receiveShadow = true;
            // 위치this.tree_.position.copy(this.position_);
            this.tree_.name = "tree4"

            const radius1 = 4;
            const tubeRadius1 = 1;
            const radialSegments1 = 3;
            const tubularSegments1 = 6;

            const Torusgeo = new THREE.TorusGeometry(
                radius1, tubeRadius1,
                radialSegments1, tubularSegments1);

            const Torusmat = new THREE.MeshLambertMaterial({
                color: 0xBDBDBD,
            });
            Torusmat.flatShading = true;
            const plant = new THREE.Mesh(Torusgeo, Torusmat);
            plant.rotation.x = Math.PI / -2;
            this.scene_.add(plant);
            plant.position.copy(this.position_);
            plant.position
                .divideScalar(6)
                .floor()
                .multiplyScalar(6)
                .addScalar(3);
            plant.position.y = 0;
        }

        random_scale(tree) {
            let min = (3);
            let max = (4);
            let num = (Math.random() * (max - min)) + min;
            tree.scale.set(num, num, num)
            tree.position.y = num / 1.5;
        }


        random_color() {
            // 색상 변경 함수
            let leafcolor = [0x164406, 0x1C3911, 0x184E04];
            let min = Math.ceil(0);
            let max = Math.floor(2);
            return leafcolor[(Math.floor(Math.random() * (max - min)) + min)];
        }

        random_rotation() {
            // 회전 변경 함수
            let min = Math.ceil(-2);
            let max = Math.floor(2);
            let a = Math.floor(Math.random() * (max - min)) + min;
            if (a == 0)
                return 1;
            else
                return Math.PI / a;
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
        tree4: tree4,
    };
})();