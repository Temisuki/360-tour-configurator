import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  Camera,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  SphereBufferGeometry,
  TextureLoader,
  WebGLRenderer
} from 'three';
import {BaseComponent} from '../../utility/BaseComponent';
import {OrbitControls} from 'three-orbitcontrols-ts';
import {ArrowController} from './arrow.controller';


@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.scss']
})
export class TourComponent extends BaseComponent implements OnInit {

  @ViewChild('canvasElement') canvasElement: ElementRef;

  renderer: WebGLRenderer;
  scene: Scene;
  camera: Camera;
  textureLoader: TextureLoader;
  controls: OrbitControls;

  sphereMaterial: MeshBasicMaterial;

  arrowController: ArrowController;

  constructor() {
    super();
  }

  ngOnInit() {
    this.textureLoader = new TextureLoader();
    this.initCanvas();
  }

  initCanvas() {
    this.renderer = new WebGLRenderer({
      preserveDrawingBuffer: true,
      canvas: this.canvasElement.nativeElement,
      antialias: true,
      alpha: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.scene = new Scene();
    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 600);
    this.camera.position.z = 1;
    this.controls = new OrbitControls(this.camera, this.canvasElement.nativeElement);
    this.controls.rotateSpeed = 0.20;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.10;

    const sphereGeometry = new SphereBufferGeometry(500, 60, 40);
    sphereGeometry.scale(-1, 1, 1);
    this.sphereMaterial = new MeshBasicMaterial( {
      map: this.textureLoader.load( 'assets/test.jpg' )
    } );
    const sphereMesh = new Mesh( sphereGeometry, this.sphereMaterial );
    this.scene.add(this.camera);
    this.scene.add(sphereMesh);
    this.onResize();
    this.onRender();
    this.arrowController = new ArrowController(this.textureLoader, this.scene, this.camera);
    window.addEventListener('resize', () => this.onResize());
  }

  update() {
    if (this.renderer && this.camera instanceof Camera) {
      this.renderer.render(this.scene, this.camera);
    }
    if (this.controls) {
      this.controls.update();
    }
    if (this.arrowController) {
      this.arrowController.update();
    }
  }

  onResize() {
    if (this.camera instanceof PerspectiveCamera) {
      this.camera.aspect = window.window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onRender() {
    this.update();
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.onRender();
      });
    }, 1000 / 30);
  }

}
