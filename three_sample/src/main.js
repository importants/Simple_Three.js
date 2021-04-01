import * as THREE from "../node_modules/three/build/three.module.js";
import {
  OrbitControls
} from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

//import { model } from "./three.js";
import {
  meshs
} from "./Mesh.js";

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
    let ambientLight = new THREE.AmbientLight(0xffffff); //자연광
    ambientLight.intensity = 1.0;
    this.scene_.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(0, 500, 0).normalize();
    this.scene_.add(directionalLight);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor("#FFFFFF", 1);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.gammaFactor = 2.2;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    var spotLight = new THREE.SpotLight(0xFFFFFF);
    spotLight.position.set(0, 200, 0);
    spotLight.castShdow = true;

    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    this.scene_.add(spotLight);

    document.body.appendChild(this.renderer.domElement);

    //this.previousRAF_ = null;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true; //가속 붙게 하기
    this.controls.enableZoom = true;
    this.controls.autoRotate = true;
    this.controls.dampingFactor = 0.0005;

    this.render();
    //this.model = new model.model({ scene: this.scene_ });

    // mesh 불러오기
    this.center = new meshs.meshs({
      scene: this.scene_,
      position: new THREE.Vector3(0, 0, 0),
      center: true,
    });

    for (let i = 0; i < 200; i++)
      this.var[i] = new meshs.meshs({
        scene: this.scene_,
        position: this.random_position(),
        center: false,
      });


    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case 32:
          console.log("안녕?");

          this.scene_.children.rotation += 1;
          console.log(this.scene_)
      }
    });
  }


  random_position() {
    // 위치 변경 함수
    let min = Math.ceil(-200);
    let max = Math.floor(200);
    let x = Math.floor(Math.random() * (max - min)) + min;
    let y = Math.floor(Math.random() * (max - min)) + min;
    let z = Math.floor(Math.random() * (max - min)) + min;
    return new THREE.Vector3(x, y, z);
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
      for (let i = 0; i < this.scene_.children.length; i++) {
        if (this.scene_.children[i].name == "mesh") {
          this.scene_.children[i].rotation.y += Math.random() * 0.03;
          this.scene_.children[i].rotation.x += Math.random() * 0.03;
        }
      }
    });
  }
  Step_(timeElapsed) {
    this.model.Update(timeElapsed);
  }

  onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 32:
        console.log("안녕?");
        for (let i; i < this.var.length; i++)
          console.log(this.var[i]);
        this.controls.enableDamping = false; //가속 붙게 하기
        this.controls.enableZoom = false;
        this.controls.autoRotate = false;
        this.controls.dampingFactor = 0;

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