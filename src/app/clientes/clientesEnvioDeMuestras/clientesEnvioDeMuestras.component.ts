import { Component, Input } from "@angular/core";
import { PeticionesService } from '../../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MuestrasFormModel } from './muestrasFormModel.component';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "clientesEnvioDeMuestras",
	templateUrl: "./clientesEnvioDeMuestras.component.html",
	// styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class ClientesEnvioDeMuestrasComponent{
	public titulo = "Página clientesEnvioDeMuestras";
	public parametro; public muestrasFormModel:MuestrasFormModel = new MuestrasFormModel();
	//Luego se llama al parametro1 desde el html: <clientesEnvioDeMuestras [parametro1]="valor"></clientesEnvioDeMuestras>
	@Input() parametro1:string;

	constructor(
		private peticionesService:PeticionesService,
		private _route: ActivatedRoute,
		private _router: Router
	){}

	ngOnInit(){
		this._route.params.forEach((params: Params) =>{
			this.parametro = params['page'];
		})
	}

	redirigir(){
		this._router.navigate(['/clientesEnvioDeMuestras','valorPage']);
	}

}