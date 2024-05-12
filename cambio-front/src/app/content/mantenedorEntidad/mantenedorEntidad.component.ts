import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ServiceService } from 'src/app/Service/service.service';


export interface reportCapacitacion {
  id_producto:number;
  nombre?: string;
  precio?: string;
  stock?: string;
  id_categoria?: number;
}

@Component({
  selector: 'app-mantenedorEntidad',
  templateUrl: './mantenedorEntidad.component.html',
  styleUrls: ['./mantenedorEntidad.component.scss']
})
export class MantenedorEntidadComponent implements OnInit {

  listCat:any = [];
  idEntidad:number=0;
  listTipoContribuyentes:any = [];
  formGroupParent: any = [];
  ELEMENT_DATA:reportCapacitacion[] = [];
  displayedColumns: string[] = ['id', 'nombre', 'precio', 'stock' ,'categoria','Actualizar','Eliminar'];

  constructor(
    private service: ServiceService,
    private fb: FormBuilder
  ) {
    this.formGroupParent = this.fb.group({
      nombre: new FormControl("",[Validators.required]),
      precio: new FormControl("",[Validators.required]),
      stock: new FormControl("",[Validators.required]),
      categoria: new FormControl("",[Validators.required]),
    });
  }

  ngOnInit() {
    this.listEntidad();
    this.listarCat();
  }
 
  
  listEntidad(){
   this.service.listProducto().subscribe(
    (result:any)=>{
      result.data.forEach((element:any) => {
        this.ELEMENT_DATA.push(
          { id_producto:element.id_producto,
            nombre:element.nombre,
            precio:element.precio,
            stock:element.stock,
            id_categoria:element.id_categoria,
          }
        );
      });
    }
   );
  }
  listarCat(){
    this.service.listCategoria().subscribe(
      (result:any)=>{
        this.listCat=result;
      }
     );
    
  }
  registrarEntidad(){
    this.formGroupParent.markAllAsTouched();
    if(this.formGroupParent.invalid){
      return;
    }
    this.service.insertEntidad(this.formGroupParent.controls.nombre.value,this.formGroupParent.controls.precio.value,this.formGroupParent.controls.stock.value,
      this.formGroupParent.controls.categoria.value).subscribe(
      (result:any)=>{
        if(result.data==1){
          this.ELEMENT_DATA = [];
          this.listEntidad();
        }
      }
    );
  }

  editarCampos(e:any){
    this.idEntidad= e.idEntidad;
    this.formGroupParent.controls.nombre.setValue(e.nombre);
    this.formGroupParent.controls.precio.setValue(e.precio);
    this.formGroupParent.controls.stock.setValue(e.stock);
    this.formGroupParent.controls.categoria.setValue(e.categoria);

  }
  actualizarEntidad(){
    this.formGroupParent.markAllAsTouched();
    if(this.formGroupParent.invalid){
      return;
    }
    this.service.updateEntidad(this.idEntidad,this.formGroupParent.controls.nombre.value,this.formGroupParent.controls.precio.value,this.formGroupParent.controls.stock.value,
      this.formGroupParent.controls.categoria.value).subscribe(
      (result:any)=>{
        if(result.data==1){
          this.ELEMENT_DATA = [];
          this.listEntidad();
        }
      }
    );
  }
  accion(){
    if(this.idEntidad == 0){
      this.registrarEntidad();
    }else{
      this.actualizarEntidad();
    }
  }
  eliminarEntidad(e:any){
    this.service.deleteContribuyente(e.idEntidad).subscribe(
      (result:any)=>{
        if(result.data == 1){
          this.ELEMENT_DATA = [];
          this.listEntidad();
        }
      }
    );
  }
  keyPress(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  onlyLetras(event: any) {
    const pattern = /[A-Z ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  limpiarFormulario(){
    this.formGroupParent.reset();
  }
}
