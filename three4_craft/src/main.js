import * as THREE from "../three/build/three.module.js";
import {
  FBXLoader
} from "../three/examples/jsm/loaders/FBXLoader.js"
import {
  OrbitControls
} from "../three/examples/jsm/controls/OrbitControls.js";
import {
  tree1
} from "./nature/tree.js";
import {
  tree2
} from "./nature/tree2.js";
import {
  ground
} from "./nature/ground.js";
import {
  round
} from "./nature/round.js";
import {
  tree3
} from "./nature/tree3.js";
import {
  tree4
} from "./nature/tree4.js";
import {
  rock
} from "./nature/rock.js";
import {
  cloud1
} from "./nature/cloud.js";
import {
  cloud2
} from "./nature/cloud2.js";

import {
  block1
} from "./block/block1.js";
import {
  block2
} from "./block/block2.js";
import {
  block3
} from "./block/block3.js";
import {
  block4
} from "./block/block4.js";
import {
  block5
} from "./block/block5.js";

class main_three {
  renderer
  constructor() {
    this._Initialize();

    this.InitInput_();

  }

  _Initialize() {
    this.clock = null;
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
    // const ambientLight = new THREE.AmbientLight(0x606060, 1);
    // ambientLight.castShdow = true;
    // this.scene_.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, .4);
    directionalLight.position.set(10000, 10000, 0);
    directionalLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
    directionalLight.castShadow = true;
    this.scene_.add(directionalLight);
    // var spotLight = new THREE.SpotLight(0x606060);

    // spotLight.position.set(0, 100, 0);
    // spotLight.castShadow = true;

    // spotLight.shadow.mapSize = new THREE.Vector2(2048, 2048);
    // this.scene_.add(spotLight);

    this.objects = [];
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
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
    this.b_one = new block1.block1();
    this.b_two = new block2.block2();
    this.b_three = new block3.block3();
    this.b_four = new block4.block4();
    this.b_five = new block5.block5();

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
    const rollOverGeo = new THREE.BoxGeometry(6, 6, 6);
    const rollOverMaterial = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      opacity: 0.5,
      transparent: true,
    });
    this.rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial);

    this.blockNum = 0;
    this.blockAddNum = 0;
    this.addObject = [];
    this.block = new THREE.Mesh(rollOverGeo, rollOverMaterial);
    this.scene_.add(this.block);
    console.log(this.objects);
    //  this._LoadAnimatedModel()
    this.animate();

  }

  // 모델 불러오기 ( 애니메이션 추가 )
  /*_LoadAnimatedModel() {
    this.mixers = [];
    const loader = new FBXLoader();
    loader.setPath('./src/char/');
    loader.load("Ch06_nonPBR.fbx", (fbx) => {
      fbx.scale.setScalar(0.05);
      fbx.traverse(c => {
        c.castShadow = true;
      })
      const params = {
        target: fbx,
        camera: this._camera,
      }

      const anim = new FBXLoader();
      anim.setPath('./src/char/');
      anim.load("Hip Hop Dancing.fbx", (anim) => {
        this._mixer = new THREE.AnimationMixer(fbx);
        this.mixers.push(this._mixer);
        const idle = this._mixer.clipAction(anim.animations[0]);
        console.log(idle)
        idle.setLoop(THREE.LoopRepeat);
        idle.clampWhenFinished = true;
        idle.play();
      })
      this.scene_.add(fbx);
    })
  }
 */

  InitInput_() {
    this.keys_ = {
      spacebar: false,
    };
    this.oldKeys = {
      ...this.keys_
    };

    let btn1 = document.getElementsByClassName("btn1")[0];
    let btn2 = document.getElementsByClassName("btn2")[0];
    let btn3 = document.getElementsByClassName("btn3")[0];
    let btn4 = document.getElementsByClassName("btn4")[0];
    let btn5 = document.getElementsByClassName("btn5")[0];

    btn1.addEventListener("click", () => {
      this.blockNum = 1;
      this.blockAddNum = 1;
    });
    btn2.addEventListener("click", () => {
      this.blockNum = 2;
      this.blockAddNum = 2;
    });
    btn3.addEventListener("click", () => {
      this.blockNum = 3;
      this.blockAddNum = 3;
    });
    btn4.addEventListener("click", () => {
      this.blockNum = 4;
      this.blockAddNum = 4;
    });
    btn5.addEventListener("click", () => {
      this.blockNum = 5;
      this.blockAddNum = 5;
    });
    document.addEventListener("keydown", (e) => this.OnKeyDown_(e), false);
    document.addEventListener("keyup", (e) => this.OnKeyUp_(e), false);
    document.addEventListener("pointermove", (e) => this.onDocumentMouseMove_(e), false);
    document.addEventListener("pointerdown", (e) => this.onDocumentMouseDown_(e), false);
    document.addEventListener("pointerup", (e) => this.onDocumentMouseUp_(e), false);
    window.addEventListener("resize", (e) => this.onWindowResize_(e), false);
  }
  onclick = false;

  OnKeyDown_(event) {
    switch (event.keyCode) {
      case 49:
        this.blockNum = 1;
        this.blockAddNum = 1;
        break;
      case 50:
        this.blockNum = 2;
        this.blockAddNum = 2;
        break;
      case 51:
        this.blockNum = 3;
        this.blockAddNum = 3;
        break;
      case 52:
        this.blockNum = 4;
        this.blockAddNum = 4;
        break;
      case 53:
        this.blockNum = 5;
        this.blockAddNum = 5;
        break;
      case 65:
        this.keys_.add = true;
        break;
      case 68:
        this.del = true;
        break;
    }
  }

  OnKeyUp_(event) {
    switch (event.keyCode) {
      case 65:
        this.keys_.add = false;
        break;
      case 68:
        this.del = false;
        let removeObject = this.addObject.pop();
        this.scene_.remove(removeObject);
        //objects 부분을 제거 
        break;
    }
  }

  onDocumentMouseMove_(event) {
    event.preventDefault();
    let visible = false;

    this.mouse.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);

    this.raycaster.setFromCamera(this.mouse, this.camera);

    const intersects = this.raycaster.intersectObjects(this.objects);
    console.log(intersects);

    switch (this.blockNum) {
      case 1:
        this.scene_.remove(this.block);
        this.block = this.b_one.block();
        this.scene_.add(this.block);
        this.blockNum = 0;
        break;
      case 2:
        this.scene_.remove(this.block);
        this.block = this.b_two.block();
        this.scene_.add(this.block);
        this.blockNum = 0;
        break;
      case 3:
        this.scene_.remove(this.block);
        this.block = this.b_three.block();
        this.scene_.add(this.block);
        this.blockNum = 0;
        break;
      case 4:
        this.scene_.remove(this.block);
        this.block = this.b_four.block();
        this.scene_.add(this.block);
        this.blockNum = 0;
        break;
      case 5:
        this.scene_.remove(this.block);
        this.block = this.b_five.block();
        this.scene_.add(this.block);
        this.blockNum = 0;
        break;
      default:
    }

    if (intersects.length > 0) {
      const intersect = intersects[0];
      if (intersect.object.name !== "tree") {

        if (!visible) {
          this.scene_.add(this.block);
          visible = true;
        }
        this.block.position.copy(intersect.point).add(intersect.face.normal);
        this.block.position
          .divideScalar(6)
          .floor()
          .multiplyScalar(6)
          .addScalar(3);
        if (this.block.position.y < 0) {
          this.block.position.y = Math.abs(this.block.position.y);
        }

      } else {
        this.scene_.remove(this.block);
        visible = false;
      }
    } else {
      this.scene_.remove(this.block);
      visible = false;
    }

  }

  onDocumentMouseDown_(event) {

    event.preventDefault();
    this.mouse.set(
      (event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1
    );
    let add;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    switch (this.blockAddNum) {
      case 1:
        add = new block1.block1();
        this.addblock = add.block();
        break;
      case 2:
        add = new block2.block2();
        this.addblock = add.block();
        break;
      case 3:
        add = new block3.block3();
        this.addblock = add.block();
        break;
      case 4:
        add = new block4.block4();
        this.addblock = add.block();
        break;
      case 5:
        add = new block5.block5();
        this.addblock = add.block();
        break;
      default:
        this.addblock = null;
    }
    if (this.keys_.add && this.addblock) {
      this.addObject.push(this.addblock);
      const intersects = this.raycaster.intersectObjects(this.objects);
      if (intersects.length > 0) {
        const intersect = intersects[0];
        if (this.del) {
          this.scene_.remove(intersect.object);
          this.objects.splice(this.objects.indexOf(intersect.object), 1);
        } else {
          if (intersect.object.name !== "tree") {
            const voxel = this.addblock;
            //new THREE.Mesh(this.rollGeo, this.rollMaterial);
            voxel.position.copy(intersect.point).add(intersect.face.normal);
            voxel.position
              .divideScalar(6)
              .floor()
              .multiplyScalar(6)
              .addScalar(3);
            if (voxel.position.y < 0) {
              voxel.position.y = Math.abs(voxel.position.y);
            }
            this.scene_.add(voxel);
            this.objects.push(voxel);
          }
        }
      }
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
      //this.mixers.map(m => m.update(0.01))
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

// btn.addEventListener("click", () => {
//   clearCanvas();
//   _APP = null;
//   _APP = new main_three();
// });

function clearCanvas() {
  var canvas = document.querySelector("canvas");
  document.body.removeChild(canvas);
}