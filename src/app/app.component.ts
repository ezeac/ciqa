import { Component } from '@angular/core';
import {TranslateService} from 'ng2-translate';
import { PeticionesService } from './services/peticiones.service';
import { Login } from './clientes/loginModel';

declare var jquery:any, $:any, TweenMax:any, Power2:any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [PeticionesService]
})
export class AppComponent {
	public formLoginModel:Login = new Login();

	ngOnInit() {
		$(".navigation-menu .nav-links > a").mouseenter(function(){
			$(this).removeClass("navigation-menu-mouse-out");
			$(this).addClass("navigation-menu-mouse-in");
		})
		$(".navigation-menu .nav-links > a").mouseleave(function(){
			$(this).addClass("navigation-menu-mouse-out");
			$(this).removeClass("navigation-menu-mouse-in");
		})
		$('.nav-links').click(function(){
			TweenMax.killAll();
			TweenMax.staggerFromTo('.content-outer-bloques-nav-item, .item-investigador, .content-outer-bloques-cont-item, .content-outer-bloques-content-item-cont-redes-svg, .cont-textos > div, .texto-inicial2 > div, .content-outer-bloques-content-item-cont-info-text, .content-outer-bloques-content-item-cont-item, .content-outer-bloques-content-item-item1, .content-outer-bloques-content-item-img, .content-outer-bloques-content-item-cont-map, .content-outer-bloques-nav1 > a, .content-outer-clientes > div', 0.5, {opacity:0, y:50},{y: 0, opacity: 1, ease: Power2.easeOut}, 0.1);
		});
		$('.navlogo').click(function(){
			TweenMax.killAll();
			TweenMax.staggerFromTo('.cont-textos > div, .texto-inicial2 > div', 0.5, {opacity:0, y:50},{y: 0, opacity: 1, ease: Power2.easeOut}, 0.1);
		})
	}
	
	constructor(private translate: TranslateService,private peticionesService:PeticionesService) {
		translate.addLangs(["es","en"])
		translate.setDefaultLang('es');
		translate.use('es');
	}

	actualizar_idioma(select = "#translate-selector") {
		$("#translate-selector").val($(select).val())
		$("#translate-selector2").val($(select).val())
		this.translate.use($(select).val());
		console.log("se cambio el idioma a " + this.translate.currentLang );
	}

}
