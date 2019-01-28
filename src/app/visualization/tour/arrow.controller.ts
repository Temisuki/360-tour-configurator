import {Camera, Raycaster, Scene, Sprite, SpriteMaterial, Texture, TextureLoader, Vector2, Vector3} from 'three';
import {ArrowModel} from '../../models/arrow.model';

export class ArrowController {

  private arrowList = [];
  private arrowMaterial: SpriteMaterial;
  private mousePos = new Vector2();
  private raycaster = new Raycaster();

  onArrowHovers = [];

  constructor(private textureLoader: TextureLoader,
              private scene: Scene,
              private camera: Camera) {
    this.textureLoader.load('assets/tour/arrow.png', texture => {
      this.arrowMaterial = new SpriteMaterial({map: texture});
    });
    window.addEventListener('keypress', (event) => this.onKeyPressed(event));
    window.addEventListener('mousemove', (event) => this.onMouseMove(event));
  }

  generateArrows(): void {

  }

  onKeyPressed(event): void {
    switch (event.key) {
      case ' ': {
        this.addArrow();
        break;
      }
      default: {
        break;
      }
    }
  }

  onArrowHover(arrow: ArrowModel): void {
    this.onArrowHovers.forEach(cb => {
      cb(arrow);
    });
  }

  registerArrowHoverCallback(arrowCallback: (arrow: ArrowModel) => void): void {
    this.onArrowHovers.push(arrowCallback);
  }

  onMouseMove(event): void {
    this.mousePos.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mousePos.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    this.raycaster.setFromCamera(this.mousePos, this.camera);
    const intersects = this.raycaster.intersectObjects(this.arrowList);
    intersects.forEach(object => {
      console.log(object);
    });
  }

  addArrow(): void {
    const sprite = new Sprite(this.arrowMaterial);
    const pos = new Vector3(0, 0, -20);
    pos.applyQuaternion(this.camera.quaternion);
    sprite.position.copy(pos);
    this.scene.add(sprite);
    this.arrowList.push(sprite);
  }

  update(): void {

  }


}
