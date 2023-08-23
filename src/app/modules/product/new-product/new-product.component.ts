import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../shared/services/category.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../shared/services/product.service';

export interface Category{
  description: string;
  id: number;
  name: string;
}

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css']
})

export class NewProductComponent implements OnInit{

  private productService = inject(ProductService);
  estadoFormulario : string = "";
  private fb = inject(FormBuilder);
  private categoryService = inject(CategoryService);
  private dialogRef = inject(MatDialogRef);
  public data = inject(MAT_DIALOG_DATA);
  public productForm!: FormGroup;
  categories: Category[] = [];

  selectedFile: any;
  nameImg: string = "";

  ngOnInit(): void {

    this.estadoFormulario = "Agregar"
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      account: ['', Validators.required],
      category: ['', Validators.required],
      picture: ['', Validators.required]
    })

    this.getCategories();

    if(this.data != null){
      this.updateForm(this.data);
      this.estadoFormulario = "Actualizar";
    }

  }

  onSave(){
    let data = {
      name: this.productForm.get('name')?.value,
      price: this.productForm.get('price')?.value,
      account: this.productForm.get('account')?.value,
      category: this.productForm.get('category')?.value,
      picture: this.selectedFile
    }

    const uploadImageData = new FormData();
    uploadImageData.append('picture', data.picture, data.picture.name);
    uploadImageData.append('name', data.name);
    uploadImageData.append('price', data.price);
    uploadImageData.append('account', data.account);
    uploadImageData.append('categoryId', data.category);

    if(this.data != null){
      //actualiza el producto
      this.productService.updateProduct(uploadImageData, this.data.id)
              .subscribe((data:any) =>{
                this.dialogRef.close(1);
              }, (error:any) =>{
                this.dialogRef.close(2);
              })
    }else{
      //llamamos al servicio de guardar un producto
    this.productService.saveProduct(uploadImageData)
            .subscribe((data:any) =>{
              this.dialogRef.close(1);
            }, (error:any) =>{
              this.dialogRef.close(2);
            })
    }
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  getCategories(){
    this.categoryService.getCategories()
        .subscribe((data:any) =>{
          this.categories = data.categoryResponse.category;
    }, (error:any) =>{
      console.log("Error al consultar categorias");
    })
  }

  onFileChanged(event:any){

    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);

    this.nameImg = event.target.files[0].name;
  }

  updateForm(data: any) {
    this.productForm = this.fb.group({
      name: [data.name, Validators.required],
      price: [data.price, Validators.required],
      account: [data.account, Validators.required],
      category: [data.category.id, Validators.required],
      picture: ['', Validators.required]
    })
  }

}
