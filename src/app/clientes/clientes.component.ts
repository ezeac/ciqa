import { Component, Input } from "@angular/core";
import { PeticionesService } from '../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Login } from './loginModel';

declare var $:any, jquery:any, TweenMax: any, Power2:any;

@Component({
	selector: "clientes",
	templateUrl: "./clientes.component.html",
	// styleUrls: ['./clientes.component.css'],
	providers: [PeticionesService]
})


export class ClientesComponent{
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


		$(document).ready(function(){
			$('.content-outer-bloques-nav1 > a').click(function(){
				console.log("e");
				TweenMax.staggerFromTo('.content-outer-clientes > div, .content-outer-clientes form > div > div', 0.5, {opacity:0, y:50},{y: 0, opacity: 1, ease: Power2.easeOut}, 0.1);
			});
		})

	}

	animate_scroll(element) {
		$('html, body').animate({'scrollTop':$(element).offset().top-100},1000);
	}

	redirigir(){
		this._router.navigate(['/clientes','valorPage']);
	}

}