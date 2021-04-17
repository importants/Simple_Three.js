import * as THREE from '../../three/build/three.module.js';

import {
    FBXLoader
} from "../../three/examples/jsm/loaders/FBXLoader.js";
import {
    GLTFLoader
} from "../../three/examples/jsm/loaders/GLTFLoader.js";
export const chair = (() => {

    let i = 0;
    class chair {
        constructor(params) {
            let {
                scene,
                position,
                rotation
            } = params;
            this.scene_ = scene;
            this.rotation = rotation;
            this.position = position;
            this.LoadModel_();
        }
        LoadModel_() {
            var Loader = new GLTFLoader();
            var model = [];
            Loader.load('src/img/loadModel/bench1/Bench.gltf', (gltf) => {
                gltf.scene.traverse(c => {
                    c.castShadow = true;
                })

                this.mesh = gltf.scene;
                console.log(this.mesh.children[0])
                this.scene_.add(this.mesh);
                this.mesh.scale.set(0.00003, 0.00003, 0.00003);
                this.mesh.rotation.y = this.rotation;
                this.mesh.position.copy(this.position);
                // const box = new THREE.BoxHelper(this.mesh, 0xffff00);
                // this.scene_.add(box);
            })

            // this.chair.castShadow = true;
            // this.chair.receiveShadow = true;
            // this.chair.name = "chair"

        }

        random_scale(chair) {
            let min = (5);
            let max = (13);
            let num2 = (Math.random() * (max - min)) + min;
            let num3 = (Math.random() * (max - min)) + min;
            let num = (Math.random() * (max - min)) + min;
            chair.scale.set(num2, num / 3, num3);
        }

    }
    return {
        chair: chair,
    };
})();