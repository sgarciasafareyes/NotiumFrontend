import {Usuario} from "./Usuario";
import {Direccion} from "./Direccion";
import {OcioNocturno} from "./OcioNocturno";

export class Rpp  {
  id?: number;
  nombre?: string;
  apellidos?: string;
  dni?: string;
  telefono?: string;
  fechaNacimiento?: Date;
  userDTO?: Usuario | null;
  direccionDTO?:Direccion | null;
  ocioNocturnoDTO?:OcioNocturno;
}
