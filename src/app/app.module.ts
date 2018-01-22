import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import {TranslateModule} from 'ng2-translate';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuienesSomosComponent } from './quienesSomos/quienesSomos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ServiciosComponent } from './servicios/servicios.component';
	import { InvestigacionComponent } from './servicios/investigacion/investigacion.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		QuienesSomosComponent,
		ContactoComponent,
		ClientesComponent,
		ServiciosComponent,
			InvestigacionComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing,
		TranslateModule.forRoot()
	],
	providers: [appRoutingProviders],
	bootstrap: [AppComponent]
})
export class AppModule { }
