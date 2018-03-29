import { Component, Input, Injectable } from "@angular/core";
import { PeticionesService } from '../../services/peticiones.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
//import { Observable } from "rxjs";
import { Http } from '@angular/http';

declare var jquery:any;
declare var $:any;

@Injectable()

@Component({
	selector: "clientesComprobantes",
	templateUrl: "./clientesComprobantes.component.html",
	// styleUrls: ['./style.css'],
	providers: [PeticionesService]
})


export class ClientesComprobantesComponent{
	public titulo = "Página clientesComprobantes";
	public parametro;
	//Luego se llama al parametro1 desde el html: <clientesComprobantes [parametro1]="valor"></clientesComprobantes>
	@Input() parametro1:string;

	constructor(
		private peticionesService:PeticionesService,
		private _route: ActivatedRoute,
		private _router: Router,
		private http: Http

	){}

	ngOnInit(){
		this._route.params.forEach((params: Params) =>{
			this.parametro = params['page'];
		})
	}

	redirigir(){
		this._router.navigate(['/clientesComprobantes','valorPage']);
	}

	fileChange(event) {
		let fileList: FileList = event.target.files;

		if(fileList.length > 0) {
			
			let formData:FormData = new FormData();
			for(var i = 0; i < fileList.length; i++){
	            formData.append(fileList[i].name, fileList[i]);
	            console.log(fileList[i]);
	        }

			console.log(formData);
	        this.http.post('../../../assets/fileUpload.php', formData).subscribe();
		}
	}

}