import { Component, OnInit, OnDestroy } from '@angular/core';
import { MainService } from "./../main.service";
import { ProductItem } from '../oop/products';

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit, OnDestroy {
  private getAllProds: any;
  public searchText;
  public searchResult;
  public searchCount;

  productList: [ProductItem];
  user: string;
  msg: string;
  txtName: string;
  contactList: any;
  defaultImg = "assets/images/1.jpg";

  constructor(private _service: MainService) { }

  ngOnInit() {
    // Getting all info from Json data
    this._service.list().subscribe(data => {
      this.productList = data as [ProductItem];
      console.log(this.productList);
    });

    this._service.cast.subscribe(data => this.user = data);
    // console.log(this.user)

      
  }

  onKeyup(event) {
    this.searchText = event.target.value;
  }

  getUsers() {
    this._service.getUser(this.searchText).subscribe(
      res => {
        this.searchResult = res; 
        this.searchCount = res.total_count;
      }
    );
  }

  addContact() {
    this.contactList.push(
      { msg: this.txtName }
    );
    console.log(this.txtName);
  }

  deleteContact(msg) {
    console.log(msg);
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i]["name"] == msg) {
        this.productList.splice(i, 1);
        this._service.data.next(msg)
      }
    }
  }




  ngOnDestroy() {
    this.getAllProds.unsubscribe();

  }

}
