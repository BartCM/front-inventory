import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { NewCategoryComponent } from '../new-category/new-category.component';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { ConfirmComponent } from 'src/app/modules/shared/components/confirm/confirm.component';
import { MatPaginator } from '@angular/material/paginator';
import { UtilService } from 'src/app/modules/shared/services/util.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{

  private categoryService = inject(CategoryService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  private util = inject(UtilService);
  isAdmin: any;

  ngOnInit(): void {
    this.getCategories();
    this.isAdmin = this.util.isAdmin();
  }

  displayedColumns: string[] = ['id', 'name', 'description', 'actions'];
  dataSource = new MatTableDataSource<CategoryElement>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  getCategories(): void{

    this.categoryService.getCategories()
            .subscribe((data:any) => {

              console.log("respuesta categories: ", data);
              this.processCategoriesResonse(data);

            }, (error:any) => {
              console.log("error: ", error);
            })

  }

  processCategoriesResonse(resp: any){
    const dataCategory: CategoryElement[] = [];

    if(resp.metadata[0].code == "00"){
      let listCategory = resp.categoryResponse.category;

      listCategory.forEach((element: CategoryElement) => {
        dataCategory.push(element);
      });

      this.dataSource = new MatTableDataSource<CategoryElement>(dataCategory);
      this.dataSource.paginator = this.paginator;
    }
  }

  openCategoryDialog(){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px'
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Categoria Agregada", "Exitosa");
        this.getCategories();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al guardar categoria", "error");
      }

    });
  }

  edit(id:number, name:string, description:string){
    const dialogRef = this.dialog.open(NewCategoryComponent, {
      width: '450px',
      data: {id:id, name:name, description:description}
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Categoria Actualizada", "Exitosa");
        this.getCategories();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al actualizar categoria", "error");
      }

    });
  }

  delete(id: any){
    const dialogRef = this.dialog.open(ConfirmComponent, {
      data: {id:id, module:"category"}
    });

    dialogRef.afterClosed().subscribe((result:any) => {

      if(result == 1){
        this.openSnackBar("Categoria Eliminada", "Exitosa");
        this.getCategories();
      } else if (result == 2){
        this.openSnackBar("Se produjo un error al eliminar la categoria", "error");
      }

    });
  }

  buscar(termino: string) {
    if(termino.length == 0){
      return this.getCategories();
    }

    this.categoryService.getCategorieById(termino)
        .subscribe((resp:any) =>{
          this.processCategoriesResonse(resp);
        })
    }

  openSnackBar(message: string, action: string) : MatSnackBarRef<SimpleSnackBar>{

    return this.snackBar.open(message, action, {
      duration : 3000
    })

  }

}

export interface CategoryElement{
  description: string;
  id: number;
  name: string;
}
