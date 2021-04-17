import * as THREE from '../../three/build/three.module.js';

export const tree1 = (() => {

    let i = 0;
    class tree1 {
        constructor(params) {
            let {
                scene,
                position,
                leafColor,
                TrunkColor
            } = params;
            this.scene_ = scene;
            this.position_ = position;
            this.leafColor_ = leafColor;
            this.TrunkColor_ = TrunkColor;
            this.velocity_ = 0.0;

            this.LoadModel_();
        }

        LoadModel_() {

            let tree1 = new THREE.Object3D();

            let trunks = [];
            let trunk_position = [];
            let trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 6, 5);
            let loader = new THREE.TextureLoader();
            let shadowMap = loader.load("./src/img/simpleShadow.jpg");
            let shadowGeo = new THREE.PlaneGeometry(8, 8);
            let shadowMat = new THREE.MeshBasicMaterial({
                color: 0x000000,
                transparent: true,
                alphaMap: shadowMap
            })
            let shadow = new THREE.Mesh(shadowGeo, shadowMat);
            let trunkMat = new THREE.MeshLambertMaterial({
                color: 0X6F441B,

            });
            // this.scene_.add(shadow);
            shadow.rotation.x = -Math.PI * 0.5;
            shadow.position.y = 0.1;
            shadow.position.z = -2
            shadow.scale.set(1.5, 2, 2);
            //shadow.scale.set(1.2,0,1.2);
            trunkMat.flatShading = true;
            for (i = 0; i < 5; i++) {
                trunks[i] = new THREE.Mesh(trunkGeo, trunkMat);
                trunks[i].castShadow = true;
                trunk_position[i] = new THREE.Object3D();
                tree1.add(trunk_position[i]);
                trunks[i].position.y = 5;
                trunk_position[i].add(trunks[i]);
            }

            let leafGo = new THREE.IcosahedronGeometry(2);
            let leafMat = null;

            let leafs = [];
            for (i = 0; i < 20; i++) {
                leafMat = new THREE.MeshLambertMaterial({
                    color: this.random_color(),
                });
                leafMat.flatShading = true;
                leafs[i] = new THREE.Mesh(leafGo, leafMat);
                leafs[i].castShadow = true;
            }

            trunk_position[0].position.y = 0;
            trunks[0].position.y = 2;
            trunks[0].scale.set(1, 1, 1);

            leafs[1].position.set(1, 4, 0);
            leafs[1].scale.set(0.7, 0.7, 0.7);
            trunk_position[0].add(leafs[1]);

            leafs[2].position.set(0, 5.5, 0);
            leafs[2].scale.set(1, 1, 1);
            trunk_position[0].add(leafs[2]);

            trunk_position[1].position.y = 2;
            trunk_position[1].rotation.y = Math.PI / 1;
            trunk_position[1].rotation.x = Math.PI / 3.5;
            trunks[1].position.y = 1;
            trunks[1].scale.set(0.3, 0.3, 0.3);

            leafs[3].position.set(0, 2.5, 0);
            leafs[3].scale.set(0.5, 0.5, 0.5);
            leafs[4].position.set(0.5, 2, 0);
            leafs[4].scale.set(0.3, 0.3, 0.3);
            for (i = 3; i < 5; i++) {
                trunk_position[1].add(leafs[i]);
            }

            trunk_position[2].position.y = 1.8;
            trunk_position[2].rotation.y = Math.PI / 0.3;
            trunk_position[2].rotation.z = Math.PI / 2.9;
            trunks[2].position.y = 1;
            trunks[2].scale.set(0.4, 0.4, 0.4);

            leafs[5].position.set(0, 3, 0);
            leafs[5].scale.set(0.7, 0.7, 0.7);
            leafs[6].position.set(0.5, 3.5, 0.5);
            leafs[6].scale.set(0.5, 0.5, 0.5);
            leafs[7].position.set(-0.5, 4, -0.5);
            leafs[7].scale.set(0.5, 0.5, 0.5);
            for (i = 5; i < 8; i++) {
                trunk_position[2].add(leafs[i]);
            }

            trunk_position[3].position.y = 2;
            trunk_position[3].rotation.y = Math.PI / 0.1;
            trunk_position[3].rotation.z = Math.PI / 3.9;
            trunks[3].position.y = 1;
            trunks[3].scale.set(0.2, 0.2, 0.2);

            leafs[8].position.set(0, 2, 0);
            leafs[8].scale.set(0.4, 0.4, 0.4);
            leafs[9].position.set(-0.5, 2, -0.5);
            leafs[9].scale.set(0.3, 0.3, 0.3);
            for (i = 8; i < 10; i++) {
                trunk_position[3].add(leafs[i]);
            }

            trunk_position[4].position.y = 1.5;
            trunk_position[4].rotation.y = Math.PI / 1.4;
            trunk_position[4].rotation.z = Math.PI / 3.9;
            trunks[4].position.y = 1;
            trunks[4].scale.set(0.2, 0.2, 0.2);

            this.scene_.add(tree1);
            this.random_scale(tree1)
            tree1.castShadow = true;
            tree1.receiveShadow = true;
            this.tree_ = tree1;
            this.tree_.rotation.y = this.random_rotation();
            this.tree_.position.copy(this.position_);
            this.tree_.position
                .divideScalar(6)
                .floor()
                .multiplyScalar(6)
                .addScalar(3);
            this.tree_.name = "tree"

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
            tree.position.y += num / 2;
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
        tree1: tree1,
    };
})();