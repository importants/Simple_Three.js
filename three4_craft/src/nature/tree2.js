import * as THREE from '../../../three/build/three.module.js';

export const tree2 = (() => {

    let i = 0;
    class tree2 {
        constructor(params) {
            let {
                scene,
                position,
                object
            } = params;
            this.scene_ = scene;
            this.position_ = position;
            this.velocity_ = 0.0;
            this.object_ = object;
            this.LoadModel_();
        }

        LoadModel_() {

            let tree2 = new THREE.Object3D();

            let trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 6, 5);
            let trunkMat = new THREE.MeshLambertMaterial({
                color: this.random_color(false)
            });
            trunkMat.flatShading = true;
            let trunks = new THREE.Mesh(trunkGeo, trunkMat);
            tree2.position.y = 2;
            tree2.add(trunks);
            const radialSegments = 5;
            const leftMat = new THREE.MeshLambertMaterial({
                color: this.random_color(true)
            })
            let leafs = [];
            for (i = 1; i < 5; i++) {
                leafs[i] = new THREE.Mesh(new THREE.ConeGeometry(i / 3, i / 0.9, radialSegments), leftMat);
                tree2.add(leafs[i]);
                leafs[i].position.y = 6 - i;
                leafs[i].castShadow = true;
            }

            this.scene_.add(tree2);
            tree2.position.copy(this.position_);
            tree2.position
                .divideScalar(6)
                .floor()
                .multiplyScalar(6)
                .addScalar(3);
            tree2.rotation.y = this.random_rotation();
            this.random_scale(tree2)
            tree2.castShadow = true;
            tree2.receiveShadow = true;
            this.tree_ = tree2;
            this.tree_.name = "tree";
            this.object_.push(leafs[1]);
            const rollOverGeo = new THREE.BoxGeometry(6, 6, 6);
            const rollOverMaterial = new THREE.MeshBasicMaterial({
                visible: false
            });
            this.rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);
            this.rollOverMesh.position.copy(tree2.position);
            this.scene_.add(this.rollOverMesh);
            this.rollOverMesh.name = "tree";
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

        random_rotation() {
            // 회전 변경 함수
            let min = Math.ceil(-2);
            let max = Math.floor(2);
            return Math.PI / (Math.floor(Math.random() * (max - min)) + min);
        }

        random_scale(tree) {
            let min = (0.85);
            let max = (1.3);
            let num = (Math.random() * (max - min)) + min;
            tree.scale.set(num, num, num)
            tree.position.y = 2;
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
        tree2: tree2,
    };
})();