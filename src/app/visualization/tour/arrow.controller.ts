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
    window.addEventListener('mousedown', (event) => this.onMouseKeyPressed(event));
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

  onArrowHover(arrow: ArrowModel, pos): void {
    this.onArrowHovers.forEach(cb => {
      cb(arrow, pos);
    });
  }

  registerArrowHoverCallback(arrowCallback: (arrow: ArrowModel, pos: Vector2) => void): void {
    this.onArrowHovers.push(arrowCallback);
  }

  onMouseMove(event): void {
    const intersects = this.getIntersects(event);
    intersects.forEach(object => {
      this.onArrowHover(object, new Vector2(event.clientX, event.clientY));
    });
    if (intersects.length === 0) {
      this.onArrowHover(null, null);
    }
  }

  onMouseKeyPressed(event): void {
    const intersects = this.getIntersects(event);
    if (intersects.length > 0) {
      console.log(intersects);
    }
  }

  getIntersects(event: MouseEvent): Object[] {
    this.mousePos.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mousePos.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this.raycaster.setFromCamera(this.mousePos, this.camera);
    return this.raycaster.intersectObjects(this.arrowList);
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
