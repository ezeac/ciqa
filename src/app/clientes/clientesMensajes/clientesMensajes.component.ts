import { Component, Input } from "@angular/core";
import { PeticionesService } from '../../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var jquery:any;
declare var $:any;

@Component({
	selector: "clientesMensajes",
	templateUrl: "./clientesMensajes.component.html",
	// styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class ClientesMensajesComponent{
	public titulo = "Página clientesMensajes";
	public parametro; public mensajeForm;
	//Luego se llama al parametro1 desde el html: <clientesMensajes [parametro1]="valor"></clientesMensajes>
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
	}

	redirigir(){
		this._router.navigate(['/clientesMensajes','valorPage']);
	}

	toggle_expanded_msj(event) {
		if ($(event.target).parent().hasClass('content-outer-clientes-item')) {
			$('.expanded-content').html($(event.target).parent().find('.content-outer-clientes-item-msjs').html()); 
			$('.content-outer-clientes-extracont').fadeOut(0); 
			$('.content-outer-clientes-msjexpanded').fadeIn();
		} else {
			$('.content-outer-clientes-msjexpanded').fadeOut(0); 
			$('.content-outer-clientes-extracont').fadeIn();
		}
	}

	enviar_mensaje(event) {
		var text = $(event.target).parent().parent().find(".content-outer-clientes-item-msjs-msj.expanded-new-msj textarea").val();
		$(event.target).parent().parent().find(".content-outer-clientes-item-msjs-msj.expanded-new-msj textarea").val('');
		var item = "\
			<div class='content-outer-clientes-item-msjs-msj bcolor-3'>\
				<div class='msjs-msj-header'>\
					<i class='material-icons tcolor-3'>mail</i>\
					<div class='content-outer-clientes-item-msjs-msj-remitent'>Diego</div>\
					<div class='content-outer-clientes-item-msjs-msj-date'>Justo&nbsp;ahora</div>\
				</div>\
				<div class='content-outer-clientes-item-msjs-msj-text'>"+text+"</div>\
			</div>\
		";
		$(event.target).parent().parent().find(".expanded-content").append(item);
	}
}