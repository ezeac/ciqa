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
		$('.nav-links:not(.mobile)').click(function(){
			TweenMax.staggerFromTo('.content-outer-bloques-nav-item, .item-investigador, .content-outer-bloques-cont-item, .content-outer-bloques-content-item-cont-redes-svg, .cont-textos > div, .texto-inicial2 > div, .content-outer-bloques-content-item-cont-info-text, .content-outer-bloques-content-item-cont-item, .content-outer-bloques-content-item-item1, .content-outer-bloques-content-item-img, .content-outer-bloques-content-item-cont-map, .content-outer-bloques-nav1 > a, .content-outer-clientes > div', 0.5, {opacity:0, y:50},{y: 0, opacity: 1, ease: Power2.easeOut}, 0.1);
		});
		$('.navlogo').click(function(){
			TweenMax.staggerFromTo('.cont-textos > div, .texto-inicial2 > div', 0.5, {opacity:0, y:50},{y: 0, opacity: 1, ease: Power2.easeOut}, 0.1);
		});
		//setTimeout(()=>{this.generar_menu_movil()},1);

		$(".navigation-menu .mobile-cont-menu > i").click(function(){
			$(".navigation-menu .mobile-cont-menu > i").fadeOut(0);
			if (parseFloat($(".navigation-menu .mobile-cont-menu .cont").css("right")) < 0) {
		    	$(".navigation-menu .mobile-cont-menu .cont").css({"display":"flex"});
		    	setTimeout(function(){$(".navigation-menu .mobile-cont-menu .cont").css({"right":"0","opacity":"1"})},0);
				$(".navigation-menu .mobile-cont-menu > i").html("close");
			} else {
				$(".navigation-menu .mobile-cont-menu .cont").css({"right":"-100vw","opacity":".3"});
				setTimeout(function(){$(".navigation-menu .mobile-cont-menu .cont").css({"display":"none"});},200);
				$(".navigation-menu .mobile-cont-menu > i").html("menu");
			}
			$(".navigation-menu .mobile-cont-menu > i").fadeIn();
		});
		$(".navigation-menu .mobile-cont-menu .cont a").click(function(){
			setTimeout(()=>{$(".navigation-menu .mobile-cont-menu > i").trigger("click")},200);
		});
	}
	
	constructor(private translate: TranslateService,private peticionesService:PeticionesService) {
		translate.addLangs(["es","en"])
		translate.setDefaultLang('es');
		translate.use('es');
	}

	generar_menu_movil() {
		var links = $(".navigation-menu .nav-links").clone().addClass("mobile");
		$(".navigation-menu .nav-links").before("<div class='mobile-cont-menu visible-xs visible-sm'><i class='material-icons'>menu</i><div class='cont' style='display: none;'>"+links.html()+"</div></div>");

		$(".navigation-menu .mobile-cont-menu .cont").append($(".navigation-menu .mobile-cont-menu .cont .button"));

		$(".navigation-menu .mobile-cont-menu .cont").prepend('<a class="font1 t14 tcolor-1" ng-reflect-router-link="/home" ng-reflect-router-link-active="claseLinkActivo" href="#/home">home</a>');		
	}

	actualizar_idioma(select = "#translate-selector") {
		$("#translate-selector").val($(select).val());
		$("#translate-selector2").val($(select).val());
		$("#translate-selector3").val($(select).val());
		this.translate.use($(select).val());
		//console.log("Se cambio el idioma a " + this.translate.currentLang );
	}

}
