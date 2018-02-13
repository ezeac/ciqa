import { Component } from '@angular/core';
import {TranslateService} from 'ng2-translate';
import { PeticionesService } from './services/peticiones.service';

declare var jquery:any; declare var $:any;

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
	providers: [PeticionesService]
})
export class AppComponent {
	title = 'app works!';
	
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
