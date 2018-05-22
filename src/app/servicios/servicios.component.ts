import { Component, Input } from "@angular/core";
import { PeticionesService } from '../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var $:any, jquery:any, TweenMax:any, Power2:any;

@Component({
	selector: "servicios",
	templateUrl: "./servicios.component.html",
	styleUrls: ['./servicios.component.css'],
	providers: [PeticionesService]
})


export class ServiciosComponent{
	public titulo = "SERVICIOS";
	public parametro;
	public service_search_result; public service_search;
	//Luego se llama al parametro1 desde el html: <servicios [parametro1]="valor"></servicios>
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

		$(document).ready(function(){
			$('.content-outer-bloques-cont-item > a').click(function(){
				TweenMax.staggerFromTo('.content-outer-bloques-nav-item, .content-outer-bloques-content-item-item1, .content-outer-bloques-content-item-img', 0.5, {opacity:0, y:50},{y: 0, opacity: 1, ease: Power2.easeOut}, 0.1);
			})
		});

		$(".content-outer-bloques-cont > div").click(function(e){
			if ($(window).width() < 992) {
				e.stopPropagation();
				$(".content-outer-bloques-cont i").fadeOut(0);
				if (parseInt($(".content-outer-bloques-cont").css("maxHeight")) > 120) {
					$(".content-outer-bloques-cont").css("maxHeight",120);
					$(".content-outer-bloques-cont").prepend($(this));
					$(".content-outer-bloques-cont i").html("arrow_drop_down");
				} else {
					$(".content-outer-bloques-cont i").html("close").css({"font-size":"20px","transform":"translateY(2px)"});
					$(".content-outer-bloques-cont").css("maxHeight",600);
				}
				$(".content-outer-bloques-cont i").fadeIn();
			}
		});

	}

	buscarServicio(search) {
		this.peticionesService.service_search(search).subscribe(
			data => this.service_search_result = data, 
			(err) => console.log(err), 
			() => setTimeout(()=>{console.log(this.service_search_result)},100)
		);
	}

	console(str) {
		console.log(str);
	}

	go_to(e) {
		if ($.type(e) == "string") {
			this.service_search_result = null;
			this._router.navigate([e]);
		} else if (e == true) {
			$('#service-search > span').fadeIn();
		} else {
			$('#service-search > span').fadeOut();
		}
	}

}