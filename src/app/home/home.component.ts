import { Component, Input } from "@angular/core";
import { PeticionesService } from '../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AgmCoreModule } from '@agm/core';

declare var jquery:any; declare var $:any; declare var particlesJS:any; declare var TweenMax:any; declare var Power2:any; declare var TweenMax:any;	declare var Power2:any;

@Component({
	selector: "home",
	templateUrl: "./home.component.html",
	styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class HomeComponent{
	public titulo = "Página home";
	public parametro;
	public sliderHome1Slides = [{margin: 0}]; public sliderHome1Actual = 0;
	public sliderHome2Slides = [{margin: 0}]; public sliderHome2Actual = 0;
	public sliderHome3Slides = [{margin: 0}]; public sliderHome3Actual = 0;
	public noticias:string = "";
	public noticia_actual = "1"; public noticia_total = "";
	
	//Luego se llama al parametro1 desde el html: <home [parametro1]="valor"></home>
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

		//this.peticionesService.llamarFooter();

		particlesJS.load("particles-js", "../assets/particlesjs.json");
		// ANIMACIÓN ARROW
		setTimeout(function(){
			var nombreAnimacion = new TweenMax.to(".texto-inicial2 .arrow-down", 1, {y: 20, yoyo: true, repeat: -1, ease: Power2.easeIn});
		},3000);

		this.peticionesService.get_noticias().subscribe(
			data => this.noticias = data, 
			(err) => console.log(err), 
			() => setTimeout(()=>{this.incializarSlidersliderHome3(); console.log(this.noticias)},100)
		);


		this.incializarSlidersliderHome1();
		this.incializarSlidersliderHome2();
		
		this.peticionesService.animate_scroll("html", 0);

	}

	redirigir(){
		this._router.navigate(['/home','valorPage']);
	}

	
	incializarSlidersliderHome1() {
		var totalItems = $("#sliderHome .sliderItem").length;
		var itemPorPantalla = 1;
		if ($(window).width() < 768) {
			itemPorPantalla = 1;
		}
		var widthCoeficiente = totalItems / itemPorPantalla;
		var widthActual = $("#sliderHome .sliderContainer").outerWidth();
		$("#sliderHome .sliderContainer").width(widthActual * widthCoeficiente);
		$("#sliderHome .sliderItem").each(function(index, element){
			$(element).outerWidth(widthActual / itemPorPantalla);
		});

		this.sliderHome1Slides = [];
		for (var i = 0; i < widthCoeficiente; ++i) {
			if (i+1 > widthCoeficiente) {
				this.sliderHome1Slides.push({margin: -(widthCoeficiente-1)*widthActual});
			} else {
				this.sliderHome1Slides.push({margin: -i*widthActual});
			}
		}
	}
	incializarSlidersliderHome2() {
		var totalItems = $("#sliderHome2 .sliderItem").length;
		var itemPorPantalla = 1;
		if ($(window).width() < 768) {
			itemPorPantalla = 1;
		}
		var widthCoeficiente = totalItems / itemPorPantalla;
		var widthActual = $("#sliderHome2 .sliderContainer").outerWidth();
		$("#sliderHome2 .sliderContainer").width(widthActual * widthCoeficiente);
		$("#sliderHome2 .sliderItem").each(function(index, element){
			$(element).outerWidth(widthActual / itemPorPantalla);
		});

		this.sliderHome2Slides = [];
		for (var i = 0; i < widthCoeficiente; ++i) {
			if (i+1 > widthCoeficiente) {
				this.sliderHome2Slides.push({margin: -(widthCoeficiente-1)*widthActual});
			} else {
				this.sliderHome2Slides.push({margin: -i*widthActual});
			}
		}
	}
	incializarSlidersliderHome3() {
		var totalItems = $("#sliderHome3 .sliderItem").length;
		var itemPorPantalla = 1;
		if ($(window).width() < 768) {
			itemPorPantalla = 1;
		}
		this.noticia_total = totalItems;
		var widthCoeficiente = totalItems / itemPorPantalla;
		var widthActual = $("#sliderHome3 .sliderContainer").outerWidth();
		$("#sliderHome3 .sliderContainer").width(widthActual * widthCoeficiente);
		$("#sliderHome3 .sliderItem").each(function(index, element){
			$(element).outerWidth(widthActual / itemPorPantalla);
		});

		this.sliderHome3Slides = [];
		for (var i = 0; i < widthCoeficiente; ++i) {
			if (i+1 > widthCoeficiente) {
				this.sliderHome3Slides.push({margin: -(widthCoeficiente-1)*widthActual});
			} else {
				this.sliderHome3Slides.push({margin: -i*widthActual});
			}
		}
	}
	moverSlider(posicion) {
		if (posicion == -1) {
			posicion = this.sliderHome1Slides.length-1;
		} else if (posicion == this.sliderHome1Slides.length) {
			posicion = 0;
		}
		//new TweenMax.to($("#sliderHome .sliderContainer"), 1, {marginLeft: this.sliderHome1Slides[posicion].margin, ease: Power2.easeOut});
		$("#sliderHome .sliderContainer").css({"marginLeft":this.sliderHome1Slides[posicion].margin})
		this.sliderHome1Actual = posicion;
	}
	moverSliderHome2(posicion) {
		if (posicion == -1) {
			posicion = this.sliderHome2Slides.length-1;
		} else if (posicion == this.sliderHome2Slides.length) {
			posicion = 0;
		}
		//new TweenMax.to($("#sliderHome2 .sliderContainer"), 1, {marginLeft: this.sliderHome2Slides[posicion].margin, ease: Power2.easeOut});
		$("#sliderHome2 .sliderContainer").css({"marginLeft":this.sliderHome2Slides[posicion].margin})
		this.sliderHome2Actual = posicion;
	}
	moverSliderHome3(posicion) {
		if (posicion == -1) {
			posicion = this.sliderHome3Slides.length-1;
		} else if (posicion == this.sliderHome3Slides.length) {
			posicion = 0;
		}
		//new TweenMax.to($("#sliderHome3 .sliderContainer"), 1, {marginLeft: this.sliderHome3Slides[posicion].margin, ease: Power2.easeOut});
		$("#sliderHome3 .sliderContainer .texto1, #sliderHome3 .sliderContainer .titulo1, #sliderHome3 .sliderContainer .button-big").css({"opacity":0});
		$("#sliderHome3 .sliderContainer .sliderItem").eq(posicion).find(".thumb-img-background2").css({"background": $("#sliderHome3 .sliderContainer .sliderItem").eq(this.sliderHome3Actual).find(".thumb-img-background").css("background")});
		// $("#sliderHome3 .sliderContainer .thumb-img-background2").css({"background-image":$("#sliderHome3 .sliderContainer .sliderItem").eq(this.sliderHome3Actual).find(".thumb-img-background2").css("background-image")});
		// alert($("#sliderHome3 .sliderContainer .sliderItem").eq(this.sliderHome3Actual).find(".thumb-img-background2").css("background"));
		$("#sliderHome3 .sliderContainer .thumb-img-background").css({"width":0});
			$("#sliderHome3 .sliderContainer .texto1, #sliderHome3 .sliderContainer .titulo1, #sliderHome3 .sliderContainer .button-big").stop().animate({"opacity":1},1000);
			$("#sliderHome3 .sliderContainer .thumb-img-background").stop().animate({"width":"95%"},500);
		// $("#sliderHome3 .sliderContainer").css({"marginLeft":this.sliderHome3Slides[posicion].margin});
		$("#sliderHome3 .sliderContainer").css({"marginLeft":this.sliderHome3Slides[posicion].margin});
		this.sliderHome3Actual = posicion;
	}


	toggle_mostrar_noticia(id = "") {
		if ($(".noticia_expanded").css("display") != "none") {
			$(".content-outer > .noticia_expanded").stop().fadeOut(0);
			$(".content-outer > div:not(.noticia_expanded)").stop().fadeIn();
		} else {
			$(".noticia_expanded .noticia-titulo").html($("#noticia-"+id+" .noticia-titulo").html());
			$(".noticia_expanded .noticia-content").html($("#noticia-"+id+" .noticia-content").html());
			$(".noticia_expanded .noticia-extract").html($("#noticia-"+id+" .noticia-resumen").html());
			$(".noticia_expanded .noticia-img").html($("#noticia-"+id+" .noticia-imagen").html());

			$(".content-outer > div:not(.noticia_expanded)").stop().fadeOut(0);
			$(".content-outer > .noticia_expanded").stop().fadeIn();
		}
		$("html, body").animate({"scrollTop":$(".content-outer").offset().top-150},500);
	}

}
