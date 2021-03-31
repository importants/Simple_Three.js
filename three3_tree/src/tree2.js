import * as THREE from '../three/build/three.module.js';

export const tree2 = (() => {

    let i = 0;
    class tree2 {
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
            this.TrunkColor = TrunkColor;
            this.velocity_ = 0.0;
            this.LoadModel_();
        }

        LoadModel_() {

            let tree2 = new THREE.Object3D();

            let trunkGeo = new THREE.CylinderGeometry(0.3, 0.5, 6, 5);
            let trunkMat = new THREE.MeshLambertMaterial({
                color: this.TrunkColor,
            });

            let trunks = new THREE.Mesh(trunkGeo, trunkMat);
            tree2.position.y = 2;
            tree2.add(trunks);
            const radialSegments = 5;
            const leftMat = new THREE.MeshLambertMaterial({
                color: this.leafColor_,
            })
            let leafs = [];
            for (i = 1; i < 5; i++) {
                leafs[i] = new THREE.Mesh(new THREE.ConeGeometry(i / 3, i / 0.9, radialSegments), leftMat);
                tree2.add(leafs[i]);
                leafs[i].position.y = 6 - i;
            }

            this.scene_.add(tree2);
            tree2.position.copy(this.position_);
            tree2.position
                .divideScalar(10)
                .floor()
                .multiplyScalar(10)
                .addScalar(2);
            tree2.rotation.y = this.random_rotation();
            this.random_scale(tree2)
            this.tree_ = tree2;
            this.tree_.name = "tree"

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
            tree.position.y += num / 2;
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