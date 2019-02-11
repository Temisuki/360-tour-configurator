import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {
  Camera,
  Mesh,
  MeshBasicMaterial, MeshLambertMaterial,
  PerspectiveCamera,
  Scene,
  SphereBufferGeometry,
  TextureLoader, Vector2, Vector3,
  WebGLRenderer
} from 'three';
import {BaseComponent} from '../../utility/BaseComponent';
import {OrbitControls} from 'three-orbitcontrols-ts';
import {ArrowController} from './arrow.controller';
import {ArrowModel, RoomModel, TourModel} from '../../models/tour.model';
import {TourService} from '../tour.service';
import {first} from 'rxjs/operators';


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

  tooltipText = '';
  tooltipPos: Vector2 = new Vector2(0, 0);
  hideTooltip = true;

  tour: TourModel;

  activeRoom: RoomModel;


  constructor(private tourService: TourService) {
    super();
  }

  ngOnInit() {
    this.textureLoader = new TextureLoader();
    this.addSubscription(this.tourService.getTour('test').subscribe(tour => {
      this.tour = tour;
      console.log(tour);
      this.initCanvas();
    }, (error) => {})
    );
  }

  initCanvas(): void {
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


    this.scene.add(this.camera);
    this.onResize();
    this.onRender();

    this.arrowController = new ArrowController(this.textureLoader, this.scene, this.camera);
    this.arrowController.registerArrowHoverCallback((arrow, position) => this.onArrowHover(arrow, position));
    this.arrowController.registerArrowClickCallback((arrow) => this.onArrowClick(arrow));
    window.addEventListener('resize', () => this.onResize());
    this.createRoom();
  }

  createRoom(): void {

    const geometry = new SphereBufferGeometry( 20, 64, 64 );
    const material = new MeshLambertMaterial( { color: 0xffffff, opacity: 0, transparent: true } );
    const sphere = new Mesh( geometry, material );
    geometry.scale(-1, 1, 1);
    this.scene.add(sphere);

    this.activeRoom = this.getFirstRoom();
    const sphereGeometry = new SphereBufferGeometry(500, 60, 40);
    sphereGeometry.scale(-1, 1, 1);
    this.sphereMaterial = new MeshBasicMaterial( {
      map: this.textureLoader.load( this.activeRoom.photo)
    } );
    this.arrowController.generateArrows(this.activeRoom.arrows);
    const sphereMesh = new Mesh( sphereGeometry, this.sphereMaterial );
    this.scene.add(sphereMesh);
  }

  changeRoom(room: RoomModel): void {
    this.activeRoom = room;
    this.textureLoader.load(room.photo, texture => {
      this.sphereMaterial.map = texture;
      this.arrowController.generateArrows(this.activeRoom.arrows);
    });
  }

  update(): void {
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

  onResize(): void {
    if (this.camera instanceof PerspectiveCamera) {
      this.camera.aspect = window.window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  onRender(): void {
    this.update();
    setTimeout(() => {
      requestAnimationFrame(() => {
        this.onRender();
      });
    }, 1000 / 30);
  }

  onArrowHover(arrowModelId: number, position: Vector2): void {
    if (!arrowModelId) {
      this.hideTooltip = true;
    } else {
      this.hideTooltip = false;
      this.tooltipPos = position;
      const arrow = this.getArrowFromModel(arrowModelId);
      this.tooltipText = this.getDestinationRoom(arrow).name;
      this.tooltipPos.y += 20;
    }
  }

  onArrowClick(arrowModelId: number): void {
    const arrow = this.getArrowFromModel(arrowModelId);
    this.changeRoom(this.getDestinationRoom(arrow));
  }

  getArrowFromModel(arrowModelId: number): ArrowModel {
    return this.activeRoom.arrows.find(arrow => arrow.arrowModelId === arrowModelId);
  }

  getFirstRoom(): RoomModel {
    const fRoom = this.tour.rooms.find(room => room.first);
    return fRoom ? fRoom : this.tour.rooms[0];
  }

  getDestinationRoom(arrow: ArrowModel): RoomModel {
    if (arrow && arrow.destination) {
      const destinationRoom = this.tour.rooms.find(room => room.id === arrow.destination);
      return destinationRoom ? destinationRoom : this.getFirstRoom();
    }
    return new RoomModel();
  }

  drop(event: DragEvent) {
    this.arrowController.addArrowAtPos(
      this.arrowController.getIntersectWorld(event)[0].point,
      event.dataTransfer.getData('text'),
      this.activeRoom
    );
    // console.log(this.arrowController.getIntersectWorld(event)[0]);
    // console.log(this.arrowController.getIntersectWorld(event));
  }

  allowDrop(event) {
    event.preventDefault();
  }

}
