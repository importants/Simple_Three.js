import * as THREE from '../../three/build/three.module.js';

export const round = (() => {


    class round {
        constructor(params) {
            let {
                scene,
            } = params;
            this.scene_ = scene;

            this.LoadModel_();
        }

        LoadModel_() {

            let textureLoader = new THREE.TextureLoader();
            let texture = textureLoader.load('./src/img/block/block2/rock-slab-wall_albedo.png');
            let htexture = textureLoader.load('./src/img/block/block2/rock-slab-wall_height.png');
            let ntexture = textureLoader.load('./src/img/block/block2/rock-slab-wall_normal-ogl.png');


            const rounds = [];
            const roundGeo = new THREE.BoxGeometry(101, 1, 12, 100, 100, 100);
            const roundMat = new THREE.MeshLambertMaterial({
                map: texture,
                shininess: 30,
            });
            roundMat.displacementMap = htexture;
            roundMat.displacementScale = 0.0052;
            roundMat.normalMap = ntexture;
            texture.repeat.x = 2;
            texture.repeat.y = 1;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            //roundMat.normalScale.set(0.5, 0.5);


            for (let i = 0; i < 5; i++) {
                let round = new THREE.Mesh(roundGeo, roundMat);
                rounds.push(round);
                rounds[i].name = "ground";
                rounds[i].castShadow = true;
                rounds[i].receiveShadow = true;
                rounds[i].rotation.x = Math.PI / -2;
                rounds[i].position.y = 2;
                this.scene_.add(rounds[i]);
            }

            rounds[0].position.x = 50;
            rounds[0].rotation.z = Math.PI / 2;
            rounds[1].position.x = -50;
            rounds[1].rotation.z = Math.PI / 2;
            rounds[2].position.z = 50;

            // 정문
            rounds[3].scale.x = 0.3;
            rounds[4].scale.x = 0.3;
            rounds[3].position.set(35, 2, -50)
            rounds[4].position.set(-35, 2, -50)

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
        round: round,
    };
})();