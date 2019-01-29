import {Vector3} from 'three';

export class TourModel {
  id: string;
  rooms: RoomModel[];
  name: string;
  description: string;
}

export class RoomModel {
  id: string;
  name: string;
  description: string;
  photo: string;
  thumbnail: string;
  arrows: ArrowModel[];
}

export class ArrowModel {
  id: string;
  position: Vector3;
  destination: number;

  constructor(position: Vector3) {
    this.position = position;
  }
}
