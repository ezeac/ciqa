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
	public mapStyles = [
		{
			'elementType': 'geometry',
			'stylers': [
				{
					'color': '#f5f5f5'
				}
			]
		},
		{
			'elementType': 'labels.icon',
			'stylers': [
				{
					'visibility': 'off'
				}
			]
		},
		{
			'elementType': 'labels.text.fill',
			'stylers': [
				{
					'color': '#616161'
				}
			]
		},
		{
			'elementType': 'labels.text.stroke',
			'stylers': [
				{
					'color': '#f5f5f5'
				}
			]
		},
		{
			'featureType': 'administrative.land_parcel',
			'elementType': 'labels.text.fill',
			'stylers': [
				{
					'color': '#bdbdbd'
				}
			]
		},
		{
			'featureType': 'poi',
			'elementType': 'geometry',
			'stylers': [
				{
					'color': '#eeeeee'
				}
			]
		},
		{
			'featureType': 'poi',
			'elementType': 'labels.text.fill',
			'stylers': [
				{
					'color': '#757575'
				}
			]
		},
		{
			'featureType': 'poi.park',
			'elementType': 'geometry',
			'stylers': [
				{
					'color': '#e5e5e5'
				}
			]
		},
		{
			'featureType': 'poi.park',
			'elementType': 'labels.text.fill',
			'stylers': [
				{
					'color': '#9e9e9e'
				}
			]
		},
		{
			'featureType': 'road',
			'elementType': 'geometry',
			'stylers': [
				{
					'color': '#ffffff'
				}
			]
		},
		{
			'featureType': 'road.arterial',
			'elementType': 'labels.text.fill',
			'stylers': [
				{
					'color': '#757575'
				}
			]
		},
		{
			'featureType': 'road.highway',
			'elementType': 'geometry',
			'stylers': [
				{
					'color': '#dadada'
				}
			]
		},
		{
			'featureType': 'road.highway',
			'elementType': 'labels.text.fill',
			'stylers': [
				{
					'color': '#616161'
				}
			]
		},
		{
			'featureType': 'road.local',
			'elementType': 'labels.text.fill',
			'stylers': [
				{
					'color': '#9e9e9e'
				}
			]
		},
		{
			'featureType': 'transit.line',
			'elementType': 'geometry',
			'stylers': [
				{
					'color': '#e5e5e5'
				}
			]
		},
		{
			'featureType': 'transit.station',
			'elementType': 'geometry',
			'stylers': [
				{
					'color': '#eeeeee'
				}
			]
		},
		{
			'featureType': 'water',
			'elementType': 'geometry',
			'stylers': [
				{
					'color': '#c9c9c9'
				}
			]
		},
		{
			'featureType': 'water',
			'elementType': 'labels.text.fill',
			'stylers': [
				{
					'color': '#9e9e9e'
				}
			]
		}
	];

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
		var nombreAnimacion = new TweenMax.to(".texto-inicial .arrow-down", 1, {y: 20, yoyo: true, repeat: -1, ease: Power2.easeIn});

		this.peticionesService.get_noticias().subscribe(
			data => this.noticias = data, 
			(err) => console.log(err), 
			() => setTimeout(()=>{this.incializarSlidersliderHome3();},100)
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
		$("#sliderHome3 .sliderContainer").css({"marginLeft":this.sliderHome3Slides[posicion].margin})
		this.sliderHome3Actual = posicion;
	}

}
