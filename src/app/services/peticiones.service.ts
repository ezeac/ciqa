import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {Http, Response, Headers} from '@angular/http';
import { Login } from '../clientes/loginModel';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

declare var jquery:any;
declare var $:any;

@Injectable()
export class PeticionesService {
	public url: string;
	public respuesta: any;
	public inicio_sesion:any = false;
	public mapStyles = [{"elementType":"geometry","stylers":[{"color":"#f5f5f5"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.land_parcel","elementType":"labels.text.fill","stylers":[{"color":"#bdbdbd"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#dadada"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#c9c9c9"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];

	constructor(private _http:Http, private _router: Router){}


	//cookies
	setCookie(cname, cvalue, exdays) {
	    var d = new Date();
	    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	    var expires = "expires="+d.toUTCString();
	    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}

	getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i = 0; i < ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0) == ' ') {
	            c = c.substring(1);
	        }
	        if (c.indexOf(name) == 0) {
	            return c.substring(name.length, c.length);
	        }
	    }
	    return "";
	}


	logout(){
		this.setCookie('inicio_sesion','',0);
		this._router.navigate(['/','valorPage']);
	}


	login(loginModel:Login){
		this.inicio_sesion = loginModel.usuario;
		this.setCookie("inicio_sesion", loginModel.usuario, 2);
		this._router.navigate(['/clientes']);
		$(".popup").fadeOut();
		$("app-root > *:not(.popup):not(header)").removeClass("blur");
	}


	//funciones generales
	show_popup(html_content = ""){
		if (html_content != "") { $(".popup-content").html(html_content) };
		$(".popup").fadeIn();
		$("app-root > *:not(.popup):not(header)").addClass("blur");
	}

	show_animated_slide(event) {
		if (event.target.classList[0] == "content-outer-bloques-content-item-item1-title") {
			$(event.target).next().slideToggle();
			$(event.target).toggleClass("content-outer-bloques-content-item-item1-title-remove");
		}
	}


	animate_scroll(element, duration = 0) {
		$('html, body').animate({'scrollTop':$(element).offset().top-100},1000);
	}

	show_animated_tab(selector, event) {
		$(event.target).parent().parent().next().children("div").each(function(index, element){
			$(element).fadeOut(0).removeClass("active-tab-content");
			if ($(element).data("content") == selector) {
				$(element).fadeIn(0).addClass("active-tab-content");
			}
		});
		$(event.target).parent().children("div").each(function(index, element){
			$(element).removeClass("active-tab-nav");
		});
		$(event.target).addClass("active-tab-nav");
	}


	get_noticias(){
		this.url = "http://ciqabackend.diezweb.com.ar/wp-json/wp/v2/noticia?fields=id,title.rendered,content.rendered,resumen,imagen.guid";
		this.respuesta = this._http.get(this.url).map(res => res.json());
		return this.respuesta;
	}

	get_integrantes(){
		this.url = "http://ciqabackend.diezweb.com.ar/wp-json/wp/v2/integrantes?fields=title.rendered,id,nombre_completo,cargo,email,telefono,foto.guid,contenido_investigador";
		this.respuesta = this._http.get(this.url).map(res => res.json());
		return this.respuesta;
	}

	get_investigadores(){
		this.url = "http://ciqabackend.diezweb.com.ar/wp-json/wp/v2/integrantes?fields=title.rendered,id,nombre_completo,cargo,email,telefono,foto.guid,contenido_investigador&filter=es_investigador:1";
		this.respuesta = this._http.get(this.url).map(res => res.json());
		return this.respuesta;
	}

	post(id, name){
		this.url = "https://api.trello.com/1/cards";
		const req = this._http.post(this.url, {
			idList : id,
			name : name,
			key : "b1691298dac8eacbce129b3672ae023c",
			token : "5e61f4f5f7f2c22c1d08c6a9fa10a0bf31bdd9d7338aa4c90359e5517334748e"
		}).subscribe(
			result => {this.respuesta = result},
			error => {this.respuesta = "Error occured"}
		);
		return this.respuesta;
	}
}