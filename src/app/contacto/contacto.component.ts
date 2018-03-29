import { Component, Input } from "@angular/core";
import { PeticionesService } from '../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

import { Contacto1 } from './contactoModel';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "contacto",
	templateUrl: "./contacto.component.html",
	styleUrls: ['./contacto.component.css'],
	providers: [PeticionesService]
})


export class ContactoComponent{
	public titulo = "Página contacto";
	public parametro; 
	public contacto1:Contacto1 = new Contacto1();

	//Luego se llama al parametro1 desde el html: <contacto [parametro1]="valor"></contacto>
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
		this.contacto1.tipoDeContactoForm = "0";
	}

	redirigir(){
		this._router.navigate(['/contacto','valorPage']);
	}

	onSubmit(event){
		console.log(this.contacto1);
	}

}