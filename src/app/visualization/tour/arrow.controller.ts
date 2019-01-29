import {Camera, Raycaster, Scene, Sprite, SpriteMaterial, Texture, TextureLoader, Vector2, Vector3} from 'three';
import {ArrowModel} from '../../models/tour.model';

export class ArrowController {

  private arrowList = [];
  private arrowMaterial: SpriteMaterial;
  private mousePos = new Vector2();
  private raycaster = new Raycaster();

  onArrowHovers = [];
  onArrowClicks = [];

  constructor(private textureLoader: TextureLoader,
              private scene: Scene,
              private camera: Camera) {
    window.addEventListener('keypress', (event) => this.onKeyPressed(event));
    window.addEventListener('mousemove', (event) => this.onMouseMove(event));
    window.addEventListener('mousedown', (event) => this.onMouseKeyPressed(event));
  }

  loadMaterial(callback: () => void) {
    this.textureLoader.load('assets/tour/arrow.png', texture => {
      this.arrowMaterial = new SpriteMaterial({map: texture});
      callback();
    });
  }


  generateArrows(arrows: ArrowModel[]): void {
    this.destroyOldArrows();
    if (this.arrowMaterial) {
      this.arrowBuilder(arrows);
    } else {
      this.loadMaterial(() => {
        this.arrowBuilder(arrows);
      });
    }
  }

  destroyOldArrows(): void {
    this.arrowList.forEach(arrow => {
      this.scene.remove(arrow);
    });
    this.arrowList = [];
  }

  private arrowBuilder(arrows: ArrowModel[]): void {
    arrows.forEach(arrow => {
      const sprite = new Sprite(this.arrowMaterial);
      const pos = arrow.position;
      pos.applyQuaternion(this.camera.quaternion);
      sprite.position.copy(pos);
      this.scene.add(sprite);
      this.arrowList.push(sprite);
    });
  }

  onKeyPressed(event): void {
    switch (event.key) {
      case ' ': {
        this.addArrow();
        break;
      }
      case 'z': {
        this.destroyOldArrows();
        break;
      }
      default: {
        break;
      }
    }
  }

  onArrowHover(arrow: ArrowModel | any, pos): void {
    this.onArrowHovers.forEach(cb => {
      cb(arrow, pos);
    });
  }

  registerArrowHoverCallback(arrowCallback: (arrow: ArrowModel, pos: Vector2) => void): void {
    this.onArrowHovers.push(arrowCallback);
  }

  registerArrowClickCallback(arrowClickCallback: (arrow: ArrowModel | any) => void): void {
    this.onArrowClicks.push(arrowClickCallback);
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
      intersects.forEach(intersect => {
        this.onArrowClicks.forEach(callback => {
          callback(intersect);
        });
      });
    }
  }

  getIntersects(event: MouseEvent): Object[] {
    this.mousePos.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mousePos.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    this.raycaster.setFromCamera(this.mousePos, this.camera);
    return this.raycaster.intersectObjects(this.arrowList);
  }

  addArrow(): void {
    if (!this.arrowMaterial) {
      this.loadMaterial(() => {
        this.arrowBuilder([new ArrowModel(new Vector3(0, 0, -20))]);
      });
    } else {
      this.arrowBuilder([new ArrowModel(new Vector3(0, 0, -20))]);
    }
    // const sprite = new Sprite(this.arrowMaterial);
    // const pos = new Vector3(0, 0, -20);
    // pos.applyQuaternion(this.camera.quaternion);
    // sprite.position.copy(pos);
    // this.scene.add(sprite);
    // this.arrowList.push(sprite);
  }

  update(): void {

  }


}
