import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditformComponent } from './editform/editform.component';

const routes: Routes = [
  {path:"editform/:id",component:EditformComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditformRoutingModule { }
