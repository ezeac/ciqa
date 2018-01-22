import { Component, Input } from "@angular/core";
import { PeticionesService } from '../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "template",
	templateUrl: "./template.component.html",
	// styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class templateComponent{
	public titulo = "Temlate Page";
	public parametro;
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
		this._router.navigate(['/template','valorPage']);
	}

}