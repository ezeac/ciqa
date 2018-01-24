import { Component, Input } from "@angular/core";
import { PeticionesService } from '../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "servicios",
	templateUrl: "./servicios.component.html",
	// styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class ServiciosComponent{
	public titulo = "SERVICIOS";
	public parametro;
	//Luego se llama al parametro1 desde el html: <servicios [parametro1]="valor"></servicios>
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
		this.peticionesService.animate_scroll("html", 0);
	}

}