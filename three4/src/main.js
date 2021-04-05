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
  round
} from "./round.js";
import {
  tree3
} from "./tree3.js";
import {
  tree4
} from "./tree4.js";
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
  renderer
  constructor() {
    this._Initialize();
    this.InitInput_();

  }

  _Initialize() {
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.position.set(230, 200, 230);
    this.camera.lookAt(0, 0, 0);

    this.scene_ = new THREE.Scene();
    this.scene_.background = new THREE.Color("rgb(243, 243, 253)");

    // lights
    // const ambientLight = new THREE.AmbientLight(0x606060, .1);
    // ambientLight.castShdow = true;
    // this.scene_.add(ambientLight);
    // const directionalLight = new THREE.DirectionalLight(0xffffff);
    // directionalLight.position.set(1000, 1000, 1000).normalize();
    // this.scene_.add(directionalLight);
    var spotLight = new THREE.SpotLight(0xFFFFFF);
    this.objects = [];
    spotLight.position.set(0, 200, 0);
    spotLight.castShdow = true;

    spotLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
    this.scene_.add(spotLight);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.setClearColor("#FFFFFF", 1);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.gammaFactor = 2.2;
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(this.renderer.domElement);

    this.previousRAF_ = null;

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    new ground.ground({
      scene: this.scene_,
      object: this.objects,
    })
    for (let i = 0; i < 20; i++)
      new tree1.tree1({
        scene: this.scene_,
        object: this.objects,
        position: new THREE.Vector3(this.random_position(), 0, this.random_position()),
      });
    for (let i = 0; i < 20; i++)
      new tree2.tree2({
        scene: this.scene_,
        object: this.objects,
        position: new THREE.Vector3(this.random_position(), 0, this.random_position()),
      });
    for (let i = 0; i < 20; i++)
      new tree3.tree3({
        scene: this.scene_,
        object: this.objects,
        position: new THREE.Vector3(this.random_position(), 0, this.random_position()),
      })
    for (let i = 0; i < 20; i++)
      new tree4.tree4({
        scene: this.scene_,
        object: this.objects,
        position: new THREE.Vector3(this.random_position(), 0, this.random_position()),
      })

    for (let i = 0; i < 10; i++)
      new rock.rock({
        scene: this.scene_,
        object: this.objects,
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



    new round.round({
      scene: this.scene_,
      object: this.objects,
      position: new THREE.Vector3(110, 0, 0),
      rotation: Math.PI / 2,
    })
    new round.round({
      scene: this.scene_,
      object: this.objects,
      position: new THREE.Vector3(-110, 0, 0),
      rotation: Math.PI / 2,
    })
    new round.round({
      scene: this.scene_,
      object: this.objects,
      position: new THREE.Vector3(0, 0, 110),
      rotation: Math.PI / 1,
    })
    new round.round({
      scene: this.scene_,
      object: this.objects,
      position: new THREE.Vector3(0, 0, -110),
      rotation: Math.PI / 1,
    })

    const rollOverGeo = new THREE.BoxGeometry(5, 5, 5);
    const rollOverMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: 0.5,
      transparent: true,
    });
    this.rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);

    this.rollGeo = new THREE.BoxGeometry(5, 5, 5);
    this.rollMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: 1,
      transparent: true,
    });

    console.log(this.objects)
    this.animate();
  }

  InitInput_() {
    this.keys_ = {
      spacebar: false,
    };
    this.oldKeys = {
      ...this.keys_
    };

    document.addEventListener("keydown", (e) => this.OnKeyDown_(e), false);
    document.addEventListener("keyup", (e) => this.OnKeyUp_(e), false);
    document.addEventListener("pointermove", (e) => this.onDocumentMouseMove_(e), false);
    document.addEventListener("pointerdown", (e) => this.onDocumentMouseDown_(e), false);
    document.addEventListener("mouseup", (e) => this.onDocumentMouseUp_(e), false);
    window.addEventListener("resize", (e) => this.onWindowResize_(e), false);
  }
  onclick = false;

  OnKeyDown_(event) {
    switch (event.keyCode) {
      case 32:
        this.keys_.space = true;
        break;
    }
  }

  OnKeyUp_(event) {
    switch (event.keyCode) {
      case 32:
        this.keys_.space = false;
        break;
    }
  }

  onDocumentMouseMove_(event) {
    event.preventDefault();

    this.mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.objects);
    console.log(intersects);

    if (intersects.length >= 2) {
      const intersect = intersects[0];
      this.scene_.remove(this.rollOverMesh);
    } else if (intersects.length = 1) {
      const intersect = intersects[0];

      this.scene_.add(this.rollOverMesh);
      this.rollOverMesh.position.copy(intersect.point).add(intersect.face.faceIndex == 9);
      this.rollOverMesh.position // face ??? 사각형 이상함
        .divideScalar(6)
        .floor()
        .multiplyScalar(6)
        .addScalar(3);

    }

    //this.render();
  }

  onDocumentMouseDown_(event) {

    event.preventDefault();


    this.mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1
    );

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.objects);
    console.log(intersects)
    if (intersects.length >= 2) {
      const intersect = intersects[0];
      if (intersect.name == 'add') {
        const rollMesh = new THREE.Mesh(this.rollGeo, this.rollMaterial);
        this.scene_.add(rollMesh);
        rollMesh.position.copy(intersect.point).add(intersect.face.normal);
        rollMesh.position
          .divideScalar(6)
          .floor()
          .multiplyScalar(6)
          .addScalar(3);
        this.objects.push(rollMesh)
        rollMesh.name = "add"
      }
    } else if (intersects.length = 1) {
      const intersect = intersects[0];

      const rollMesh = new THREE.Mesh(this.rollGeo, this.rollMaterial);
      this.scene_.add(rollMesh);
      rollMesh.position.copy(intersect.point).add(intersect.face.normal);
      rollMesh.position
        .divideScalar(6)
        .floor()
        .multiplyScalar(6)
        .addScalar(3);

      this.objects.push(rollMesh)
      rollMesh.name = "add"
    }
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

  animate(controls) {
    // this.renderer.render(this.scene_, this.camera);
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

      //this.Step_((t - this.previousRAF_) / 1000.0);
      this.renderer.render(this.scene_, this.camera);
      this.previousRAF_ = t;

      // document.addEventListener("pointerdown", (e) => this.onDocumentMouseDown_(e), false);
      this.animate();
      this.controls.update();
    });
  }
  // Step_(timeElapsed) {
  //   this.model.Update(timeElapsed);
  // }





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