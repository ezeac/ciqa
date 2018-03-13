import { Component, Input } from "@angular/core";
import { PeticionesService } from '../../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "clientesInformacion",
	templateUrl: "./clientesInformacion.component.html",
	// styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class ClientesInformacionComponent{
	public titulo = "Página clientesInformacion";
	public parametro;
	//Luego se llama al parametro1 desde el html: <clientesInformacion [parametro1]="valor"></clientesInformacion>
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
		this._router.navigate(['/clientesInformacion','valorPage']);
	}

}