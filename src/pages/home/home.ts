import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: GoogleMap;
  mapElement: HTMLElement;
  autocomplete: any;
  address:any;
  lat: any;
  lon: any;


  constructor(public navCtrl: NavController, private googleMaps: GoogleMaps, private geolocation: Geolocation) {
    this.address = {
          place: ''
        };


        }



  ionViewDidLoad() {
    setTimeout(()=>{
       this.getLocation();

     }, 400);



}

getLocation() {
  this.geolocation.getCurrentPosition().then((resp) => {
       this.lat= resp.coords.latitude;
       this.lon= resp.coords.longitude;
       console.log(this.lat);
       console.log(this.lon);
       setTimeout(()=>{
          this.loadMap(this.lat, this.lon);

        }, 100);

      }).catch((error) => {
        console.log('Error getting location', error);
      });
}

loadMap(lat, lon) {
    this.mapElement = document.getElementById('map');

  /*   */

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: lat,//this.lat,
          lng: lon//this.lon
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create(this.mapElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.


        this.map.addMarker({
            title: 'Ionic',
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: lat,//this.lat,
              lng: lon//this.lon
            }
          })
          .then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                alert('clicked');
              });
          });

      });
  }
}
