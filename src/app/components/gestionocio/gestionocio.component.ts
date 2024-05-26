import {Component, OnInit, ViewChild} from '@angular/core';
import {HeaderocionocturnoComponent} from "../headerocionocturno/headerocionocturno.component";
import {FooterocionocturnoComponent} from "../footerocionocturno/footerocionocturno.component";
import {IonicModule, IonModal} from "@ionic/angular";
import {OcionocturnoService} from "../../services/ocionocturno.service";
import {OcioNocturno} from "../../models/OcioNocturno";
import {ActivatedRoute} from "@angular/router";
import {Evento} from "../../models/Evento";
import {EventoService} from "../../services/evento.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {RppService} from "../../services/rpp.service";
import {Rpp} from "../../models/Rpp";
import {ListaOcio} from "../../models/ListaOcio";
import {ListaOcioService} from "../../services/listaOcio.service";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {OverlayEventDetail} from '@ionic/core';
import {Direccion} from "../../models/Direccion";
import {Usuario} from "../../models/Usuario";
import {MatButton} from "@angular/material/button";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatStep, MatStepLabel, MatStepper, MatStepperNext} from "@angular/material/stepper";
import {arrowForward, calendar, closeOutline, flameOutline, pricetags, shirtOutline, watch} from "ionicons/icons";
import {addIcons} from "ionicons";
import {CodigoVestimentaOcio} from "../../models/CodigoVestimentaOcio";
import {EdadMinimaOcio} from "../../models/EdadMinimaOcio";
import {provideNativeDateAdapter} from "@angular/material/core";

const IonIcons = {
  shirtOutline,
  arrowForward,
  calendar,
  watch,
  pricetags,
  closeOutline,
  flameOutline
}
@Component({
  selector: 'app-gestionocio',
  templateUrl: './gestionocio.component.html',
  styleUrls: ['./gestionocio.component.scss'],
  imports: [
    HeaderocionocturnoComponent,
    FooterocionocturnoComponent,
    IonicModule,
    DatePipe,
    NgForOf,
    NgIf,
    FormsModule,
    MatButton,
    MatDatepicker,
    MatDatepickerToggle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    MatStep,
    MatStepLabel,
    MatStepper,
    MatStepperNext,
    ReactiveFormsModule,
    MatDatepickerInput,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule
  ],
  standalone: true,
  providers: [
    provideNativeDateAdapter()
  ],
})
export class GestionocioComponent  implements OnInit {

  @ViewChild(IonModal) modal!: IonModal;
  message = 'Rpp creado con éxito';

  eventosInfo: string = 'eventosInfo';
  ocio: OcioNocturno = new OcioNocturno();
  eventos: Evento[] = [];
  rpps: Rpp[] = [];
  rppDeleted: Rpp = new Rpp();
  newRpp: Rpp = new Rpp();
  direccion: Direccion = new Direccion();
  usuario: Usuario = new Usuario();
  listas: ListaOcio[] = [];
  isModalOpen = false;
  firstFormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  datosEvento = this.formBuilder.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    tematica: ['', Validators.required],
    fecha: ['', Validators.required],
    codigoVestimentaOcio: ['', Validators.required],
    edadMinimaOcio: ['', Validators.required],
    aforo: ['', Validators.required],
    cartel: ['', Validators.required],
    ocioNocturnoDTO: ['', Validators.required],
  });
  unico = true;
  vestimentas: string[] = Object.keys(CodigoVestimentaOcio).filter(key => isNaN(Number(key))) as string[];
  edadMinima: string[] = Object.keys(EdadMinimaOcio).filter(key => isNaN(Number(key))) as string[];
  constructor(
    private ocioNocturnoService : OcionocturnoService,
    private eventoService : EventoService,
    private rppService : RppService,
    private listaService : ListaOcioService,
    private route:ActivatedRoute,
    private formBuilder: FormBuilder) {
    addIcons(IonIcons);
  }

  ngOnInit() {
    this.getOcio()
  }


  getOcio(){
    this.route.params.subscribe(params => {
      const ocioID = +params['id'];
      if (ocioID) {
        this.ocioNocturnoService.ocioPorId(ocioID).subscribe({
          next: value => {
            this.ocio = value as OcioNocturno;
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }

  getEventos(){
    this.route.params.subscribe(params => {
      const ocioID = +params['id'];
      if (ocioID) {
        this.eventoService.getAllByOcio(ocioID).subscribe({
          next: value => {
            this.eventos = value.object as Evento[];
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }

  getRpps(){
    this.route.params.subscribe(params => {
      const ocioID = +params['id'];
      if (ocioID) {
        this.rppService.rppsByOcio(ocioID).subscribe({
          next: value => {
            this.rpps = value as Rpp[];
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }

  getListas(){
    this.route.params.subscribe(params => {
      const rppID = +params['id'];
      if (rppID) {
        this.listaService.getByRppId(rppID).subscribe({
          next: value => {
            this.listas = value as ListaOcio[];
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }

  deleteRpp(){
    this.route.params.subscribe(params => {
      const rppID = +params['id'];
      if (rppID) {
        this.rppService.eliminarRpp(rppID).subscribe({
          next: value => {
            this.rppDeleted = value as Rpp;
          },
          error: e => {
            console.error(e);
          }
        })
      }
    })
  }
  Eventos() {
    this.eventosInfo = 'eventosInfo';
    this.getEventos()
  }

  Staff() {
    this.eventosInfo = 'staff';
    this.getRpps()
  }

  Galeria() {
    this.eventosInfo = 'galeria';
  }

  RegistrarRpp() {
    this.rppService.guardarRpp(this.newRpp).subscribe({
      next: value => {
       // this.newRpp.direccionDTO = this.direccion;
        // this.newRpp.userDTO = this.usuario;
        this.newRpp = value as Rpp;
        console.log(value);
      },
      error: e => {
        console.error("no funciona",e);
      }
    })
  }

  onWillDismiss($event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<Rpp>>;
    if (ev.detail.role === 'confirmar') {
      this.message;
      this.RegistrarRpp()
    }
  }


  cancelar() {
    this.modal.dismiss(null, 'cancelar')
  }

  confirmar() {
    this.modal.dismiss(this.newRpp, 'confirmar')
  }

  openM(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  eventoUnico(b: boolean) {
    this.unico = b;
  }
}




