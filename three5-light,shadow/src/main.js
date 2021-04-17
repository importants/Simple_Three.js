import * as THREE from "../three/build/three.module.js";
import {
  OrbitControls
} from "../three/examples/jsm/controls/OrbitControls.js";
import {
  FBXLoader
} from "../../three/examples/jsm/loaders/FBXLoader.js";


//import { model } from "./three.js";
import {
  meshs
} from "./Mesh.js";

import {
  ground
} from "./three3/ground.js"

import {
  tree1
} from "./three3/tree.js"

import {
  tree4
} from "./three3/tree4.js"

import {
  tree3
} from "./three3/tree3.js"

import {
  round
} from "./three3/round.js";

import {
  cloud1
} from "./three3/cloud.js";
import {
  cloud2
} from "./three3/cloud2.js";

import {
  chair
} from "./three3/chair.js";

import {
  GUI
} from "../three/examples/jsm/libs/dat.gui.module.js"


class BasicCharacterControls {
  constructor(params) {
    this._Init(params);
  }

  _Init(params) {
    this._params = params;
    this._move = {
      forward: false,
      backward: false,
      left: false,
      right: false,
    };
    this._decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
    this._acceleration = new THREE.Vector3(1, 0.25, 50.0);
    this._velocity = new THREE.Vector3(0, 0, 0);

    document.addEventListener('keydown', (e) => this._onKeyDown(e), false);
    document.addEventListener('keyup', (e) => this._onKeyUp(e), false);
  }

  _onKeyDown(event) {
    switch (event.keyCode) {
      case 87: // w
        this._move.forward = true;
        break;
      case 65: // a
        this._move.left = true;
        break;
      case 83: // s
        this._move.backward = true;
        break;
      case 68: // d
        this._move.right = true;
        break;
      case 38: // up
      case 37: // left
      case 40: // down
      case 39: // right
        break;
    }
  }

  _onKeyUp(event) {
    switch (event.keyCode) {
      case 87: // w
        this._move.forward = false;
        break;
      case 65: // a
        this._move.left = false;
        break;
      case 83: // s
        this._move.backward = false;
        break;
      case 68: // d
        this._move.right = false;
        break;
      case 38: // up
      case 37: // left
      case 40: // down
      case 39: // right
        break;
    }
  }

  Update(timeInSeconds) {
    const velocity = this._velocity;
    const frameDecceleration = new THREE.Vector3(
      velocity.x * this._decceleration.x,
      velocity.y * this._decceleration.y,
      velocity.z * this._decceleration.z
    );
    frameDecceleration.multiplyScalar(timeInSeconds);
    frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
      Math.abs(frameDecceleration.z), Math.abs(velocity.z));

    velocity.add(frameDecceleration);

    const controlObject = this._params.target;
    const _Q = new THREE.Quaternion();
    const _A = new THREE.Vector3();
    const _R = controlObject.quaternion.clone();

    if (this._move.forward) {
      velocity.z += this._acceleration.z * timeInSeconds;
    }
    if (this._move.backward) {
      velocity.z -= this._acceleration.z * timeInSeconds;
    }
    if (this._move.left) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }
    if (this._move.right) {
      _A.set(0, 1, 0);
      _Q.setFromAxisAngle(_A, -Math.PI * timeInSeconds * this._acceleration.y);
      _R.multiply(_Q);
    }

    controlObject.quaternion.copy(_R);

    const oldPosition = new THREE.Vector3();
    oldPosition.copy(controlObject.position);

    const forward = new THREE.Vector3(0, 0, 1);
    forward.applyQuaternion(controlObject.quaternion);
    forward.normalize();

    const sideways = new THREE.Vector3(1, 0, 0);
    sideways.applyQuaternion(controlObject.quaternion);
    sideways.normalize();

    sideways.multiplyScalar(velocity.x * timeInSeconds);
    forward.multiplyScalar(velocity.z * timeInSeconds);

    controlObject.position.add(forward);
    controlObject.position.add(sideways);

    oldPosition.copy(controlObject.position);
  }
}

class main_three {
  var = [];
  controls;
  shadowHelper;
  constructor() {
    this._Initialize();
    this.InitInput_();
  }

  _Initialize() {
    this.camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    );
    this.camera.position.set(100, 100, 100);
    this.camera.lookAt(0, 0, 0);



    this.scene_ = new THREE.Scene();
    this.scene_.background = new THREE.Color("rgb(243, 243, 253)");

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor("#FFFFFF", 1);
    //this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;



    // lights

    const ambientLight = new THREE.AmbientLight(0x606060, 0.7);
    this.scene_.add(ambientLight);

    let directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(50, 80, -50);

    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene_.add(directionalLight);
    this.scene_.add(directionalLight.target);

    var d = 80;
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -d;
    directionalLight.shadow.camera.right = d;
    directionalLight.shadow.camera.top = d;
    directionalLight.shadow.camera.bottom = -d;

    directionalLight.shadow.camera.near = 0.01;
    directionalLight.shadow.camera.far = 10000;



    let gui = new GUI();
    gui.add(directionalLight.position, 'x', -100, 100, 0.1);
    gui.add(directionalLight.position, 'y', 50, 100, 0.1);
    gui.add(directionalLight.position, 'z', -100, 100, 0.1);
    this.helper = new THREE.DirectionalLightHelper(directionalLight, 10)
    //this.scene_.add(this.helper)
    this.shadowHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
    //this.scene_.add(this.shadowHelper)
    document.body.appendChild(this.renderer.domElement);

    // 축 보기
    // const axesHelper = new THREE.AxesHelper(100);
    // this.scene_.add(axesHelper);

    //this.previousRAF_ = null;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    // this.controls.enableDamping = true; //가속 붙게 하기
    // this.controls.enableZoom = true;
    // this.controls.autoRotate = true;
    // this.controls.dampingFactor = 0.0005;


    // mesh 불러오기
    this.center = new ground.ground({
      scene: this.scene_
    });

    this.tree1 = new tree4.tree4({
      scene: this.scene_,
      position: new THREE.Vector3(33, 0, 35)
    });

    this.tree2 = new tree3.tree3({
      scene: this.scene_,
      position: new THREE.Vector3(-33, 0, -33)
    });

    this.tree3 = new tree1.tree1({
      scene: this.scene_,
      position: new THREE.Vector3(33, 0, -35)
    });

    this.tree4 = new tree3.tree3({
      scene: this.scene_,
      position: new THREE.Vector3(-33, 0, 33)
    });

    this.tree5 = new tree1.tree1({
      scene: this.scene_,
      position: new THREE.Vector3(33, 0, -2)
    });

    this.tree6 = new tree1.tree1({
      scene: this.scene_,
      position: new THREE.Vector3(-33, 0, -2)
    });

    this.round = new round.round({
      scene: this.scene_
    })

    this.chair1 = new chair.chair({
      scene: this.scene_,
      position: new THREE.Vector3(15, -12, -28),
      rotation: Math.PI / 0.645
    })
    this.chair2 = new chair.chair({
      scene: this.scene_,
      position: new THREE.Vector3(-15, -12, -33),
      rotation: Math.PI / -0.69
    })



    for (let i = 0; i < 200; i++)
      this.cloud1 = new cloud1.cloud1({
        scene: this.scene_,
        position: new THREE.Vector3(this.random_position_cloud() / 1.2, 100, this.random_position_cloud() / 1.2),
      })
    for (let i = 0; i < 200; i++)
      this.cloud2 = new cloud2.cloud2({
        scene: this.scene_,
        position: new THREE.Vector3(this.random_position_cloud() / 1.2, 100, this.random_position_cloud() / 1.2),
      })

    this._mixers = [];
    this._previousRAF = null;

    this.render();
    this._LoadAnimatedModel();

  }

  _LoadAnimatedModel() {
    const loader = new FBXLoader();
    loader.setPath('./src/img/char/');
    loader.load('Ch09_nonPBR.fbx', (fbx) => {
      fbx.scale.setScalar(0.1);
      fbx.traverse(c => {
        c.castShadow = true;
      });

      const params = {
        target: fbx,
        camera: this.camera,
      }
      this._controls = new BasicCharacterControls(params);

      const anim = new FBXLoader();
      anim.setPath('./src/img/char/');
      anim.load('Swagger Walk.fbx', (anim) => {
        const m = new THREE.AnimationMixer(fbx);
        this._mixers.push(m);
        const idle = m.clipAction(anim.animations[0]);
        idle.play();
      });
      this.scene_.add(fbx);
    });
  }

  // _LoadAnimatedModelAndPlay(path, modelFile, animFile, offset) {
  //   const loader = new FBXLoader();
  //   loader.setPath(path);
  //   loader.load(modelFile, (fbx) => {
  //     fbx.scale.setScalar(0.1);
  //     fbx.traverse(c => {
  //       c.castShadow = true;
  //     });
  //     fbx.position.copy(offset);

  //     const anim = new FBXLoader();
  //     anim.setPath(path);
  //     anim.load(animFile, (anim) => {
  //       const m = new THREE.AnimationMixer(fbx);
  //       this._mixers.push(m);
  //       const idle = m.clipAction(anim.animations[0]);
  //       idle.play();
  //     });
  //     this._scene.add(fbx);
  //   });
  // }


  InitInput_() {

    document.addEventListener("keydown", (e) => this.OnKeyDown_(e), false);
    document.addEventListener("keyup", (e) => this.OnKeyUp_(e), false);
    document.addEventListener("pointermove", (e) => this.onDocumentMouseMove_(e), false);
    document.addEventListener("pointerdown", (e) => this.onDocumentMouseDown_(e), false);
    document.addEventListener("pointerup", (e) => this.onDocumentMouseUp_(e), false);
    window.addEventListener("resize", (e) => this.onWindowResize_(e), false);
  }

  random_position_cloud() {
    // 위치 변경 함수
    let min = Math.ceil(-1000);
    let max = Math.floor(1000);
    let result = Math.floor(Math.random() * (max - min)) + min;

    return result;
  }

  OnKeyDown_(event) {
    switch (event.keyCode) {
      case 49:
        break;
      case 50:
        break;
    }
  }

  OnKeyUp_(event) {
    switch (event.keyCode) {
      case 65:
        break;
      case 68:
        break;
    }
  }

  onDocumentMouseMove_(event) {

  }

  onDocumentMouseDown_(event) {

  }

  onDocumentMouseUp_(event) {

  }


  onWindowResize_() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(
      window.innerWidth, window.innerHeight
    );
  }



  render() {
    requestAnimationFrame((t) => {
      if (this.previousRAF_ === null) {
        this.previousRAF_ = t;
      }
      this.render();
      this.renderer.render(this.scene_, this.camera);
      this.controls.update();
      this.shadowHelper.update();
      this._Step(t - this._previousRAF);
      this.rotation_();
      this.previousRAF_ = t;
      for (let i = 0; i < this.scene_.children.length; i++) {
        if (this.scene_.children[i].name == "cloud") {
          this.scene_.children[i].position.x -= 0.01
          this.scene_.children[i].position.z -= 0.01
        }
      }
    });
  }

  _Step(timeElapsed) {
    const timeElapsedS = timeElapsed * 0.00000001;
    if (this._mixers) {
      this._mixers.map(m => m.update(timeElapsedS));
    }

    if (this._controls) {
      this._controls.Update(timeElapsedS);
    }
  }

  onDocumentKeyDown(event) {


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