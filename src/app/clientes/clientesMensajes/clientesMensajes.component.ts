import { Component, Input } from "@angular/core";
import { PeticionesService } from '../../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "clientesMensajes",
	templateUrl: "./clientesMensajes.component.html",
	// styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class ClientesMensajesComponent{
	public titulo = "Página clientesMensajes";
	public parametro;
	//Luego se llama al parametro1 desde el html: <clientesMensajes [parametro1]="valor"></clientesMensajes>
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
		this._router.navigate(['/clientesMensajes','valorPage']);
	}

}