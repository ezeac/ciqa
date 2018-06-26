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
	public feedbacks; public result;
	public tipoDeContactoForm; public nombreForm; public dniForm; public emailForm; public empresaForm; public mensajeForm; 	

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
		this.tipoDeContactoForm = "0";
		//this.peticionesService.get_peticion("201", {"parametro1":"valor1","parametro2":"valor2"}).subscribe(
		this.peticionesService.get_peticion("201").subscribe(
			data => this.feedbacks = data._parametro2, 
			(err) => console.log(err), 
			() => setTimeout(()=>{},100));
	}

	redirigir(){
		this._router.navigate(['/contacto','valorPage']);
	}

	onSubmit(event){
		var params = {"TipoDeContacto": event.path["0"]["0"].value, "Empresa": event.path["0"]["1"].value, "Nombre": event.path["0"]["2"].value, "Email": event.path["0"]["3"].value, "Mensaje": event.path["0"]["4"].value};
		console.log(params);
		this.peticionesService.send_contacto(params).subscribe(
			data => this.result = data, 
			(err) => console.log(err), 
			() => setTimeout(()=>{
				alert(this.result.mensaje);
				console.log(this.result.mensaje);
			},100));
	}

}