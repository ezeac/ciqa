import { Component, Input } from "@angular/core";
import { PeticionesService } from '../../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;
declare var TweenMax:any; declare var Power3:any; declare var animIn:any;

@Component({
	selector: "ingenieriaAmbiental",
	templateUrl: "./ingenieriaAmbiental.component.html",
	// styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class IngenieriaAmbientalComponent{
	public titulo = "Página ingenieriaAmbiental";
	public parametro; public imgNav = "aire.jpg";
	//Luego se llama al parametro1 desde el html: <ingenieriaAmbiental [parametro1]="valor"></ingenieriaAmbiental>
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
		this._router.navigate(['/ingenieriaAmbiental','valorPage']);
	}

	actualizarImgNav(event, nombre){
		console.log(event);
		function animIn(){
			$(".content-outer-bloques-nav-img > img").attr("src","../assets/media/ingAmbientalNav/"+nombre);
			$(".content-outer-bloques-nav-img-text").html(event.target.innerHTML);
			var tween = TweenMax.to($(".content-outer-bloques-nav-img"), .5, {opacity: 1, ease:Power3.easeOut});		
		}
		var tween = TweenMax.to($(".content-outer-bloques-nav-img"), .3, {opacity: 0.2, ease:Power3.easeIn, onComplete: animIn});
	}

}