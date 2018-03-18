import { Component, Input } from "@angular/core";
import { PeticionesService } from '../../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;
declare var TweenMax:any; declare var Power3:any; declare var animIn:any;

@Component({
	selector: "ingenieriaAmbiental",
	templateUrl: "./ingenieriaAmbiental.component.html",
	styleUrls: ['./ingenieriaAmbiental.component.css'],
	providers: [PeticionesService]
})


export class IngenieriaAmbientalComponent{
	public titulo = "Página ingenieriaAmbiental";
	public parametro; public imgNav = "aire.jpg";
	public thumbSlides = [{margin: 0}];
	//Luego se llama al parametro1 desde el html: <ingenieriaAmbiental [parametro1]="valor"></ingenieriaAmbiental>
	@Input() parametro1:string;

	constructor(
		private peticionesService:PeticionesService,
		private _route: ActivatedRoute,
		private _router: Router
	){}

	ngOnInit() {
		this._route.params.subscribe(
			params => {
				this.parametro = params['action'];
				if (this.parametro) {
					switch (this.parametro) {
						case "aire":
							$(".content-outer-bloques-nav-item:nth-child(1)").trigger("click");
							break;
						case "agua":
							$(".content-outer-bloques-nav-item:nth-child(2)").trigger("click");
							break;
						case "suelos":
							$(".content-outer-bloques-nav-item:nth-child(3)").trigger("click");
							break;
						case "equipamiento":
							$(".content-outer-bloques-nav-item:nth-child(4)").trigger("click");
							break;
						case "impacto":
							$(".content-outer-bloques-nav-item:nth-child(5)").trigger("click");
							break;
					}
					$("html, body").animate({"scrollTop":$(".nav-style-2.content-outer-bloques-nav").offset().top},1000);
				}
			}
		);
		// this._route.params.forEach((params: Params) =>{
		// 	this.parametro = params['action'];
		// })
		$(document).ready(function(){
			$('.owl-carousel').owlCarousel({
				thumbs: true,
				thumbsPrerendered: true
			});
		});

		this.incializarSliderthumb();
	}

	redirigir(){
		this._router.navigate(['/ingenieriaAmbiental','valorPage']);
	}

	actualizarImgNav(event, nombre){
		function animIn(){
			$(".content-outer-bloques-nav-img > img").attr("src","../assets/media/ingAmbientalNav/"+nombre);
			$(".content-outer-bloques-nav-img-text").html($(event.target).html());
			var tween = TweenMax.to($(".content-outer-bloques-nav-img"), .5, {opacity: 1, ease:Power3.easeOut});		
		}
		var tween = TweenMax.to($(".content-outer-bloques-nav-img"), .3, {opacity: 0.2, ease:Power3.easeIn, onComplete: animIn});
	}


	incializarSliderthumb() {
		var totalItems = $("#thumb .thumbItem").length;
		var itemPorPantalla = 6;
		if ($(window).width() < 768) {
			itemPorPantalla = 3;
		}
		var widthCoeficiente = totalItems / itemPorPantalla;
		var widthActual = $("#thumb .thumbContainer").outerWidth();
		$("#thumb .thumbContainer").width(widthActual * widthCoeficiente);
		$("#thumb .thumbItem").each(function(index, element){
			$(element).outerWidth(widthActual / itemPorPantalla);
		});

		this.thumbSlides = [];
		for (var i = 0; i < widthCoeficiente; ++i) {
			if (i+1 > widthCoeficiente) {
				this.thumbSlides.push({margin: -(widthCoeficiente-1)*widthActual});
			} else {
				this.thumbSlides.push({margin: -i*widthActual});
			}
		}
	}

	moverSliderthumb(e) {
		e.preventDefault();
		var posicion = $("#thumbItemActual").data("to");
		if ($(e.srcElement).parent().hasClass("thumbNext")){
			posicion++;
		} else {
			posicion--;
		}
		if (posicion == -1) {
			posicion = this.thumbSlides.length-1;
		} else if (posicion == this.thumbSlides.length) {
			posicion = 0;
		}
		$("#thumb .thumbContainer").css({"marginLeft":this.thumbSlides[posicion].margin})
		$("#thumbItemActual").data("to", posicion);
	}

	actualizar_info_item(number){
		$(".texto-info-item-slider > .texto-info-item-slider-thums").stop().fadeOut(0);
		$(".texto-info-item-slider > .texto-info-item-slider-thums").eq(number).stop().fadeIn();
	}

	mostrar_info_completa_equipamiento(){
		if ($(".content-outer-bloques-content-equipamiento > div:nth-child(3)").css("display") == "none") {
			$(".content-outer-bloques-content-equipamiento > div:nth-child(1), .content-outer-bloques-content-equipamiento > div:nth-child(2)").fadeOut(0);
			$(".content-outer-bloques-content-equipamiento > div:nth-child(3)").fadeIn();			
			$("html, body").animate({"scrollTop":$(".content-outer-bloques-nav").offset().top-100},500);
		} else {
			$(".content-outer-bloques-content-equipamiento > div:nth-child(1), .content-outer-bloques-content-equipamiento > div:nth-child(2)").fadeIn();
			$(".content-outer-bloques-content-equipamiento > div:nth-child(3)").fadeOut(0);
		}
	}
}