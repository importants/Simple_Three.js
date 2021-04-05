import * as THREE from '../three/build/three.module.js';

export const tree4 = (() => {

    let i = 0;
    class tree4 {
        constructor(params) {
            let {
                scene,
                position,
                leafColor,
                TrunkColor,
                object
            } = params;
            this.scene_ = scene;
            this.position_ = position;
            this.leafColor_ = leafColor;
            this.TrunkColor_ = TrunkColor;
            this.velocity_ = 0.0;
            this.object_ = object;
            this.LoadModel_();
        }

        LoadModel_() {

            let tree4 = new THREE.Object3D();

            let trunks = [];
            let trunk_position = [];
            let trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 6, 5);
            let trunkMat = new THREE.MeshLambertMaterial({
                color: this.random_color(false),
            });
            for (i = 0; i < 2; i++) {
                trunks[i] = new THREE.Mesh(trunkGeo, trunkMat);
                trunk_position[i] = new THREE.Object3D();
                tree4.add(trunk_position[i]);
                trunks[i].position.y = 5;
                trunk_position[i].add(trunks[i]);
            }

            let leafGo = new THREE.IcosahedronGeometry(2);
            let leafMat = null;

            let leafs = [];
            for (i = 1; i < 6; i++) {
                leafMat = new THREE.MeshLambertMaterial({
                    color: this.random_color(true),
                });
                leafs[i] = new THREE.Mesh(leafGo, leafMat);
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
                .divideScalar(10)
                .floor()
                .multiplyScalar(10)
                .addScalar(0);
            tree4.rotation.y = this.random_rotation();
            this.random_scale(tree4)
            this.tree_ = tree4;
            tree4.castShadow = true;
            tree4.receiveShadow = true;
            // 위치this.tree_.position.copy(this.position_);
            this.tree_.name = "tree4";
            const rollOverGeo = new THREE.BoxGeometry(5, 5, 5);
            const rollOverMaterial = new THREE.MeshBasicMaterial({
                color: 0xff0000,
                opacity: 0,
                transparent: true,
            });
            this.rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
            this.rollOverMesh.position.copy(this.tree_.position);
            this.scene_.add(this.rollOverMesh);
            this.rollOverMesh.position.y = -2.5;
            this.object_.push(this.rollOverMesh);
            this.rollOverMesh.name = "tree4";
        }

        random_color(model) {
            // 위치 변경 함수
            let leafcolor = [0x164406, 0x1C3911, 0x184E04];
            let trunkcolor = [0x6F441B, 0x745231, 0x905011];
            let min = Math.ceil(0);
            let max = Math.floor(2);
            let color = null;
            if (model) { // leaf
                color = leafcolor[Math.floor(Math.random() * (max - min)) + min];
            } else { // trunk
                color = trunkcolor[Math.floor(Math.random() * (max - min)) + min];
            }
            return color;
        }

        random_scale(tree) {
            let min = (0.85);
            let max = (1.3);
            let num = (Math.random() * (max - min)) + min;
            tree.scale.set(num, num, num)
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
        tree4: tree4,
    };
})();