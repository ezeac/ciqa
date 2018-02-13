import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import {TranslateModule} from 'ng2-translate';
import { AgmCoreModule } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { QuienesSomosComponent } from './quienesSomos/quienesSomos.component';
import { InvestigacionComponent } from './investigacion/investigacion.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ClientesComponent } from './clientes/clientes.component';
	import { ClientesInformacionComponent } from './clientes/clientesInformacion/clientesInformacion.component';
	import { ClientesEnvioDeMuestrasComponent } from './clientes/clientesEnvioDeMuestras/clientesEnvioDeMuestras.component';
	import { ClientesPresupuestosComponent } from './clientes/clientesPresupuestos/clientesPresupuestos.component';
	import { ClientesHistorialComponent } from './clientes/clientesHistorial/clientesHistorial.component';
	import { ClientesMensajesComponent } from './clientes/clientesMensajes/clientesMensajes.component';
	import { ClientesComprobantesComponent } from './clientes/clientesComprobantes/clientesComprobantes.component';
import { ServiciosComponent } from './servicios/servicios.component';
	import { IngenieriaAmbientalComponent } from './servicios/ingenieriaAmbiental/ingenieriaAmbiental.component';
	import { IngenieriaDeProcesosComponent } from './servicios/ingenieriaDeProcesos/ingenieriaDeProcesos.component';
	import { CapacitacionesComponent } from './servicios/capacitaciones/capacitaciones.component';
	import { AuditoriaDeTanquesComponent } from './servicios/auditoriaDeTanques/auditoriaDeTanques.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		QuienesSomosComponent,
		InvestigacionComponent,
		ContactoComponent,
		ClientesComponent,
			ClientesInformacionComponent,
			ClientesEnvioDeMuestrasComponent,
			ClientesPresupuestosComponent,
			ClientesHistorialComponent,
			ClientesMensajesComponent,
			ClientesComprobantesComponent,
		ServiciosComponent,
			IngenieriaAmbientalComponent,
			IngenieriaDeProcesosComponent,
			CapacitacionesComponent,
			AuditoriaDeTanquesComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		routing,
		TranslateModule.forRoot(),
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyBWKWRmLRQoiBdclOgMQVMIxij2x2lE4f8'
		}),
    	AgmSnazzyInfoWindowModule
	],
	providers: [appRoutingProviders],
	bootstrap: [AppComponent]
})
export class AppModule { }
