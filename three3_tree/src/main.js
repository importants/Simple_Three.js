import * as THREE from "../three/build/three.module.js";
import {
  OrbitControls
} from "../three/examples/jsm/controls/OrbitControls.js";
import {
  tree1
} from "./tree.js";
import {
  tree2
} from "./tree2.js";
import {
  ground
} from "./ground.js";
import {
  tree3
} from "./tree3.js";
import {
  rock
} from "./rock.js";
import {
  cloud1
} from "./cloud.js";
import {
  cloud2
} from "./cloud2.js";

class main_three {
  var = [];
  controls;
  constructor() {
    this._Initialize();
  }

  _Initialize() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.set(100, 100, 100);
    this.camera.lookAt(0, 0, 0);

    this.scene_ = new THREE.Scene();
    this.scene_.background = new THREE.Color("rgb(243, 243, 253)");

    // lights
    const ambientLight = new THREE.AmbientLight(0x606060);
    this.scene_.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(100, 100, 100).normalize();
    this.scene_.add(directionalLight);



    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor("#FFFFFF", 1);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.gammaFactor = 2.2;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);

    //this.previousRAF_ = null;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);







    for (let i = 0; i < 80; i++)
      new tree1.tree1({
        scene: this.scene_,
        position: new THREE.Vector3(this.random_position(), 0, this.random_position()),
        leafColor: this.random_color(true),
        TrunkColor: this.random_color(false),
      });
    for (let i = 0; i < 80; i++)
      new tree2.tree2({
        scene: this.scene_,
        position: new THREE.Vector3(this.random_position(), 0, this.random_position()),
        leafColor: this.random_color(true),
        TrunkColor: this.random_color(false),
      });
    for (let i = 0; i < 80; i++)
      new tree3.tree3({
        scene: this.scene_,
        position: new THREE.Vector3(this.random_position(), 0, this.random_position()),
        leafColor: this.random_color(true),
        TrunkColor: this.random_color(false),
      })
    new ground.ground({
      scene: this.scene_,
    })
    for (let i = 0; i < 50; i++)
      new rock.rock({
        scene: this.scene_,
        position: new THREE.Vector3(this.random_position(), 0, this.random_position()),
      })

    for (let i = 0; i < 200; i++)
      this.cloud1 = new cloud1.cloud1({
        scene: this.scene_,
        position: new THREE.Vector3(this.random_position_cloud() / 1.2, 0, this.random_position_cloud() / 1.2),
      })
    for (let i = 0; i < 200; i++)
      this.cloud2 = new cloud2.cloud2({
        scene: this.scene_,
        position: new THREE.Vector3(this.random_position_cloud() / 1.2, 0, this.random_position_cloud() / 1.2),
      })

    window.addEventListener("resize", this.onWindowResize);
    document.addEventListener("keydown", this.onDocumentKeyDown);

    this.render();
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

  random_position() {
    // 위치 변경 함수
    let min = Math.ceil(-100);
    let max = Math.floor(100);
    let result = Math.floor(Math.random() * (max - min)) + min;

    return result;
  }

  random_position_cloud() {
    // 위치 변경 함수
    let min = Math.ceil(-1000);
    let max = Math.floor(1000);
    let result = Math.floor(Math.random() * (max - min)) + min;

    return result;
  }

  render(controls) {
    requestAnimationFrame((t) => {
      if (this.previousRAF_ === null) {
        this.previousRAF_ = t;
      }
      for (let i = 0; i < this.scene_.children.length; i++) {
        if (this.scene_.children[i].name == "cloud1" || this.scene_.children[i].name == "cloud2") {
          this.scene_.children[i].position.x -= 0.01
          this.scene_.children[i].position.z -= 0.01
        }
      }
      this.render();
      this.controls.update();
      //this.Step_((t - this.previousRAF_) / 1000.0);
      this.renderer.render(this.scene_, this.camera);
      this.previousRAF_ = t;

    });
  }
  Step_(timeElapsed) {
    this.model.Update(timeElapsed);
  }

  onDocumentKeyDown(event) {
    switch (event.keyCode) {
      // case 32:
      //   stop = true;
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      window.innerWidth, window.innerHeight
    );
  }

}

let _APP = null;

window.addEventListener("DOMContentLoaded", () => {
  _APP = new main_three();
});

let btn = document.getElementsByClassName("click")[0];

btn.addEventListener("click", () => {
  clearCanvas();
  _APP = null;
  _APP = new main_three();
});

function clearCanvas() {
  var canvas = document.querySelector("canvas");
  document.body.removeChild(canvas);
}