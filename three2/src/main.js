import * as THREE from "../node_modules/three/build/three.module.js";
import {
  OrbitControls
} from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

//import { model } from "./three.js";
import {
  meshs
} from "./Mesh.js";

let stop = false;

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
    this.camera.position.set(50, 50, 50);
    this.camera.lookAt(0, 500, 0);

    this.scene_ = new THREE.Scene();
    this.scene_.background = new THREE.Color("rgb(243, 243, 253)");

    // lights
    let ambientLight = new THREE.AmbientLight(0xffffff); //자연광
    this.scene_.add(ambientLight);



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
    this.controls.target.y += 100;


    this.render();
    //this.model = new model.model({ scene: this.scene_ });


    for (let i = 0; i < 50; i++)
      new meshs.meshs({
        scene: this.scene_,
        position: new THREE.Vector3(this.random_position(), i * 10, this.random_position()),
      });


    document.addEventListener("keydown", this.onDocumentKeyDown);
  }


  random_position() {
    // 위치 변경 함수
    let min = Math.ceil(-5);
    let max = Math.floor(5);
    let result = Math.floor(Math.random() * (max - min)) + min;

    return result;
  }

  render(controls) {
    requestAnimationFrame((t) => {
      if (this.previousRAF_ === null) {
        this.previousRAF_ = t;
      }

      this.render();
      this.controls.update();
      //this.Step_((t - this.previousRAF_) / 1000.0);
      this.rotation_();
      this.renderer.render(this.scene_, this.camera);
      this.previousRAF_ = t;

      if (stop) {
        this.controls.target.y = 100;
      } else {
        this.controls.target.y += 0.01;
      }
    });
  }
  Step_(timeElapsed) {
    this.model.Update(timeElapsed);
  }

  onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 32:
        stop = true;
    }
  }

  rotation_() {

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