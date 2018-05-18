import { Component, Input } from "@angular/core";
import { PeticionesService } from '../../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "auditoriaDeTanques",
	templateUrl: "./auditoriaDeTanques.component.html",
	// styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class AuditoriaDeTanquesComponent{
	public titulo = "Página auditoriaDeTanques";
	public parametro;
	//Luego se llama al parametro1 desde el html: <auditoriaDeTanques [parametro1]="valor"></auditoriaDeTanques>
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

		//slideUp/Down Options
		$(".content-outer-bloques-nav > div > div").click(function(e){
			if ($(window).width() < 768) {
				e.stopPropagation();
				$(".content-outer-bloques-nav > div i").fadeOut(0);
				if (parseInt($(".content-outer-bloques-nav").css("maxHeight")) > 80) {
					$(".content-outer-bloques-nav").css("maxHeight",80);
					$(".content-outer-bloques-nav > div").prepend($(this));
					$(".content-outer-bloques-nav > div i").html("arrow_drop_down");
				} else {
					$(".content-outer-bloques-nav > div i").html("close").css({"font-size":"20px","transform":"translateY(2px)"});
					$(".content-outer-bloques-nav").css("maxHeight",400);
				}
				$(".content-outer-bloques-nav > div i").fadeIn();
			}
		});
	}

	redirigir(){
		this._router.navigate(['/auditoriaDeTanques','valorPage']);
	}

}