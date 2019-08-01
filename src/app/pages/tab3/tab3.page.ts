import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  pallet = null;
  pos = null;
  nuevaPos = null;
  public http: Http;
  constructor(private barcodeScanner: BarcodeScanner) {}


  leerPallet() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.pallet = barcodeData.text;
     }).catch(err => {
         console.log('Error al scanear código', err);
     });
  }

  leerPos() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.pos = barcodeData.text;
     }).catch(err => {
         console.log('Error al scanear código', err);
     });
  }
  leerNuevaPos() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.nuevaPos = barcodeData.text;
     }).catch(err => {
         console.log('Error al scanear código', err);
     });
  }
  enviar(){

    var headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json' );
    const requestOptions = new RequestOptions({ headers: headers });

    let postData = {
            'pallet': this.pallet,
            'pos': this.pos,
            'nuevaPos': this.nuevaPos
    }

    this.http.post("http://127.0.0.1:3000/", postData, requestOptions)
      .subscribe(data => {
        console.log(data['body']);
       }, error => {
        console.log(error);
      });
    this.pallet = null;
    this.pos = null;
    this.nuevaPos = null;
  }

}
