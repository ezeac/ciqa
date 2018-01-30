import { Injectable } from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';

declare var jquery:any;
declare var $:any;

@Injectable()
export class PeticionesService{
	public url: string;
	public respuesta: any;

	constructor(private _http:Http){}


	//funciones generales
	show_animated_slide(event) {
		$(event.target).next().slideToggle();
		$(event.target).toggleClass("content-outer-bloques-content-item-item1-title-remove");
	}


	animate_scroll(element, duration = 1000) {
		$('html, body').animate({'scrollTop':$(element).offset().top-100},1000);
	}

	show_animated_tab(selector, event) {
		$(event.target).parent().parent().children("div").each(function(index, element){
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

	//apis
	get_noticias(){
		this.url = "http://localhost/wp-json/wp/v2/noticia";
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