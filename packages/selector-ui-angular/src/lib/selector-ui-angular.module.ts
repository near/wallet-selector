import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DIRECTIVES } from "../generated/directives/directives";

@NgModule({
  imports: [CommonModule],
  declarations: [...DIRECTIVES],
  exports: [...DIRECTIVES],
})
export class SelectorUiAngularModule {}
