import { Component, Input } from "@angular/core";
import { PeticionesService } from '../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "servicios",
	templateUrl: "./servicios.component.html",
	styleUrls: ['./servicios.component.css'],
	providers: [PeticionesService]
})


export class ServiciosComponent{
	public titulo = "SERVICIOS";
	public parametro;
	public service_search_result; public service_search;
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

	buscarServicio(search) {
		this.peticionesService.service_search(search).subscribe(
			data => this.service_search_result = data, 
			(err) => console.log(err), 
			() => setTimeout(()=>{console.log(this.service_search_result)},100)
		);
	}

}