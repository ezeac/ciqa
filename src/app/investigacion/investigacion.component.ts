import { Component, Input } from "@angular/core";
import { PeticionesService } from '../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "investigacion",
	templateUrl: "./investigacion.component.html",
	styleUrls: ['./investigacion.component.css'],
	providers: [PeticionesService]
})


export class InvestigacionComponent{
	public titulo = "Página investigacion";
	public parametro; public investigador; public img_areas_de_interes = "";
	//Luego se llama al parametro1 desde el html: <investigacion [parametro1]="valor"></investigacion>
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

		this.peticionesService.get_investigadores().subscribe(
			data => this.investigador = data.filter(String), 
			(err) => console.log(err), 
			() => {},
		);
	}

	animate_scroll(element) {
		$('html, body').animate({'scrollTop':$(element).offset().top-100},1000);
	}

	redirigir(){
		this._router.navigate(['/investigacion','valorPage']);
	}

	toggleFullContent(action, event = null){
		if (action == 1) {
			var parent = $(event.target).closest(".content-outer-bloques-content-item-cont");
			$(".content-outer-bloques-content-item-fullpage .content-outer-bloques-content-item-fullpage-nav-tit").html(parent.find(".content-outer-bloques-content-item-cont-tit1").html());
			$(".content-outer-bloques-content-item-fullpage .content-outer-bloques-content-item-cont-img").html(parent.find(".content-outer-bloques-content-item-cont-img").html());
			$(".content-outer-bloques-content-item-fullpage .content-outer-bloques-content-item-cont-tit1").html(parent.find(".content-outer-bloques-content-item-cont-tit1").html());
			$(".content-outer-bloques-content-item-fullpage .content-outer-bloques-content-item-cont-tit2").html(parent.find(".content-outer-bloques-content-item-cont-tit2").html());
			var contactInfo = parent.find(".content-outer-bloques-content-item-cont-info-row-text");
			$(".content-outer-bloques-content-item-fullpage .content-outer-bloques-content-item-cont-info-row-text").eq(0).html(contactInfo.eq(0).html());
			$(".content-outer-bloques-content-item-fullpage .content-outer-bloques-content-item-cont-info-row-text").eq(1).html(contactInfo.eq(1).html());
			$(".content-outer-bloques-content-item-fullpage .content-outer-bloques-content-item-fullpage-cont-content").html(parent.find(".content-outer-bloques-content-item-cont-info-content").html());


			$(".extra-content-investigadores-cont").stop().fadeOut(0);
			$(".content-outer-bloques-content-item-fullpage").stop().fadeIn();
		} else {
			$(".content-outer-bloques-content-item-fullpage").stop().fadeOut(0);
			$(".extra-content-investigadores-cont").stop().fadeIn();
		}
	}

}