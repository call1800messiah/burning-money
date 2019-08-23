import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ModuleImportGuard } from './module-import.guard';
import { NavComponent } from './components/nav/nav.component';



@NgModule({
  exports: [
    NavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    NavComponent,
    PageNotFoundComponent,
  ],
  providers: [
    ModuleImportGuard
  ],
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule, private moduleImportGuard: ModuleImportGuard) {
    this.moduleImportGuard.throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
