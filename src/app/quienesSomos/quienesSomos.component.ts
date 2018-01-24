import { Component, Input } from "@angular/core";
import { PeticionesService } from '../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "quienesSomos",
	templateUrl: "./quienesSomos.component.html",
	// styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class QuienesSomosComponent{
	public parametro;
	//Luego se llama al parametro1 desde el html: <quienesSomos [parametro1]="valor"></quienesSomos>
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

	animate_scroll(element, duration = 1000) {
		$('html, body').animate({'scrollTop':$(element).offset().top-100},1000);
	}

	redirigir(){
		this._router.navigate(['/quienesSomos','valorPage']);
	}

}