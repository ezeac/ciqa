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
	public parametro; public mensajeForm; public formNuevoTemaTitulo; public arrayDeTemas; public detalleTema; public envioMensaje; public conversacionActual;
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
		});
		this.peticionesService.get_peticion("206", {"cliente":this.peticionesService.getCookie('usuarioId'),"minIDconversacion":"00","cantRegistros":"10"}).subscribe(
		//this.peticionesService.get_peticion("201").subscribe(
			data => this.arrayDeTemas = data._parametro2, 
			(err) => console.log(err), 
			() => setTimeout(()=>{},100));
	}

	redirigir(){
		this._router.navigate(['/clientesMensajes','valorPage']);
	}

	toggle_expanded_msj(event, id = 0) {
		if (id != 0) {
			this.peticionesService.get_peticion("208", {"cliente":this.peticionesService.getCookie('usuarioId'),"minIDMensaje":"00","cantRegistros":"10","idConversacion":"0"+id}).subscribe(
				data => this.detalleTema = data._parametro2,
				(err) => console.log(err), 
				() => setTimeout(()=>{
					// $.each(this.detalleTema, function(){
					// 	$(this)["textomensaje"] = $(this)["textomensaje"].replace(/\<\!\[CDATA\[|\]\]\>/g,"");
					// });
					
					$('.content-outer-clientes-extracont').fadeOut(0);
					$('.content-outer-clientes-msjexpanded').fadeIn();
					if (this.detalleTema.statuspeticion) {
						alert(this.detalleTema.statuspeticion);
					}
					this.conversacionActual = id;
					console.log("detalleTema:");
					console.log(this.detalleTema);
				},100));
		} else {
			$('.content-outer-clientes-msjexpanded').fadeOut(0); 
			$('.content-outer-clientes-extracont').fadeIn();
		}
	}

	enviar_mensaje(event, id) {
		var text = $(event.target).parent().parent().find(".content-outer-clientes-item-msjs-msj.expanded-new-msj textarea").val();
		$(event.target).parent().parent().find(".content-outer-clientes-item-msjs-msj.expanded-new-msj textarea").val('');
		var item = "\
			<div class='content-outer-clientes-item-msjs-msj bcolor-3'>\
				<div class='msjs-msj-header'>\
					<i class='material-icons tcolor-3'>mail</i>\
					<div class='content-outer-clientes-item-msjs-msj-remitent'>"+this.peticionesService.getCookie('usuarioId')+"</div>\
					<div class='content-outer-clientes-item-msjs-msj-date'>Justo&nbsp;ahora</div>\
				</div>\
				<div class='content-outer-clientes-item-msjs-msj-text'>"+text+"</div>\
			</div>\
		";
		//$(event.target).parent().parent().find(".expanded-content").append(item);
		text = text.replace(/\[|\]/g,"");
		text = "<![CDATA[" + text + "]]>";
		this.peticionesService.get_peticion("207", {"cliente":this.peticionesService.getCookie('usuarioId'),"idConversacion":"0"+id,"idMensaje":"00","textoMensaje":text}).subscribe(
		//this.peticionesService.get_peticion("201").subscribe(
			data => this.envioMensaje = data._parametro2, 
			(err) => console.log(err), 
			() => setTimeout(()=>{alert("Su nuevo mensaje enviado correctamente.");},100));
		$('.content-outer-clientes-msjexpanded').fadeOut(0); 
		$('.content-outer-clientes-extracont').fadeIn();
	}

	nuevoTema(event) {
		this.peticionesService.get_peticion("203",{"idConversacion":"00","cliente":this.peticionesService.getCookie('usuarioId'),"descripTema":this.formNuevoTemaTitulo}).subscribe(
		//this.peticionesService.get_peticion("201").subscribe(
			data => this.arrayDeTemas = data._parametro2, 
			(err) => console.log(err), 
			() => setTimeout(()=>{
				this.peticionesService.get_peticion("206", {"cliente":this.peticionesService.getCookie('usuarioId'),"minIDconversacion":"00","cantRegistros":"10"}).subscribe(
				//this.peticionesService.get_peticion("201").subscribe(
					data => this.arrayDeTemas = data._parametro2, 
					(err) => console.log(err), 
					() => setTimeout(()=>{},100));
			},100));
	}
}