import { Component } from '@angular/core';
import {TranslateService} from 'ng2-translate';
import { PeticionesService } from './services/peticiones.service';
import { Login } from './clientes/loginModel';

declare var jquery:any; declare var $:any;

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
