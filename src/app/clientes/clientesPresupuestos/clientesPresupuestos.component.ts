import { Component, Input } from "@angular/core";
import { PeticionesService } from '../../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "clientesPresupuestos",
	templateUrl: "./clientesPresupuestos.component.html",
	// styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class ClientesPresupuestosComponent{
	public titulo = "Página clientesPresupuestos";
	public parametro; public arrayDePresupuestos;
	//Luego se llama al parametro1 desde el html: <clientesPresupuestos [parametro1]="valor"></clientesPresupuestos>
	@Input() parametro1:string;

	constructor(
		private peticionesService:PeticionesService,
		private _route: ActivatedRoute,
		private _router: Router
	){}

	ngOnInit(){
		this._route.params.forEach((params: Params) =>{
			this.parametro = params['page'];
		});

		this.peticionesService.get_peticion("209", {"cliente":this.peticionesService.getCookie('usuarioId'),"MINidPresupuesto":"00","cantRegistros":"100"}).subscribe(
			data => this.arrayDePresupuestos = data._parametro2, 
			(err) => console.log(err), 
			() => setTimeout(()=>{},100));
	}

	redirigir(){
		this._router.navigate(['/clientesPresupuestos','valorPage']);
	}

}