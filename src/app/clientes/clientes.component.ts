import { Component, Input } from "@angular/core";
import { PeticionesService } from '../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Login } from './loginModel';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "clientes",
	templateUrl: "./clientes.component.html",
	// styleUrls: ['./clientes.component.css'],
	providers: [PeticionesService]
})


export class ClientesComponent{
	public titulo = "Autogestión Clientes";
	public parametro; public formLoginModel:Login = new Login();
	//Luego se llama al parametro1 desde el html: <template [parametro1]="valor"></template>
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
		this.animate_scroll("html");
	}

	animate_scroll(element) {
		$('html, body').animate({'scrollTop':$(element).offset().top-100},1000);
	}

	redirigir(){
		this._router.navigate(['/clientes','valorPage']);
	}

}