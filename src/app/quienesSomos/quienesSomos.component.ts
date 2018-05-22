import { Component, Input } from "@angular/core";
import { PeticionesService } from '../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "quienesSomos",
	templateUrl: "./quienesSomos.component.html",
	// styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class QuienesSomosComponent{
	public parametro; public investigador;
	//Luego se llama al parametro1 desde el html: <quienesSomos [parametro1]="valor"></quienesSomos>
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
		this.peticionesService.animate_scroll("html", 0);

		this.peticionesService.get_integrantes().subscribe(
			data => this.investigador = data.filter(String).sort(function(a, b){return a.menu_order-b.menu_order}), 
			(err) => console.log(err), 
			() => {console.log(this.investigador)},
		);


		//slideUp/Down Options
		$(".content-outer-bloques-nav > div > div").click(function(e){
			if ($(window).width() < 992) {
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

	animate_scroll(element, duration = 1000) {
		$('html, body').animate({'scrollTop':$(element).offset().top-100},1000);
	}

	redirigir(){
		this._router.navigate(['/quienesSomos','valorPage']);
	}

}