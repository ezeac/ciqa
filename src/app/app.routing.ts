import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importar componentes
import { HomeComponent } from './home/home.component';
import { QuienesSomosComponent } from './quienesSomos/quienesSomos.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ServiciosComponent } from './servicios/servicios.component';
	import { InvestigacionComponent } from './servicios/investigacion/investigacion.component';

//Crear rutas
const appRoutes: Routes = [
	{path: '', component:HomeComponent},
	{path: 'home', component:HomeComponent},
	// {path: 'home/:page', component:HomeComponent},
	{path: 'quienesSomos', component:QuienesSomosComponent},
	{path: 'servicios', component:ServiciosComponent,
		children: [
			{ path: '', redirectTo: '', pathMatch: 'full' },
			{ path: 'investigacion', component: InvestigacionComponent }
		]
	},
	{path: 'contacto', component:ContactoComponent},
	{path: 'clientes', component:ClientesComponent},
	{path: '**', component:HomeComponent},
];

//Se crea el nav html de esta forma: <a [routerLink]="['/quienesSomos']" [routerLinkActive]="['claseLinkActivo']"></a>
export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);