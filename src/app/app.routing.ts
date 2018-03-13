import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes
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

//Crear rutas
const appRoutes: Routes = [
	{path: '', component:HomeComponent},
	{path: 'home', component:HomeComponent},
	// {path: 'home/:page', component:HomeComponent},
	{path: 'quienesSomos', component:QuienesSomosComponent},
	{path: 'investigacion', component:InvestigacionComponent},
	{path: 'servicios', component:ServiciosComponent,
		children: [
			{ path: '', redirectTo: 'ingenieriaAmbiental', pathMatch: 'full' },
			{ path: 'ingenieriaAmbiental', component: IngenieriaAmbientalComponent },
			{ path: 'ingenieriaDeProcesos', component: IngenieriaDeProcesosComponent },
			{ path: 'capacitaciones', component: CapacitacionesComponent },
			{ path: 'auditoriaDeTanques', component: AuditoriaDeTanquesComponent }
		]
	},
	{path: 'contacto', component:ContactoComponent},
	{path: 'clientes', component:ClientesComponent,
		children: [
			{ path: '', redirectTo: 'clientesInformacion', pathMatch: 'full' },
			{ path: 'clientesInformacion', component: ClientesInformacionComponent },
			{ path: 'clientesEnvioDeMuestras', component: ClientesEnvioDeMuestrasComponent },
			{ path: 'clientesPresupuestos', component: ClientesPresupuestosComponent },
			{ path: 'clientesHistorial', component: ClientesHistorialComponent },
			{ path: 'clientesMensajes', component: ClientesMensajesComponent },
			{ path: 'clientesComprobantes', component: ClientesComprobantesComponent }
		]
	},
	{path: '**', component:HomeComponent},
];

//Se crea el nav html de esta forma: <a [routerLink]="['/quienesSomos']" [routerLinkActive]="['claseLinkActivo']"></a>
export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);