/*
* Load Google Maps Asynchronous
* via appending script
* Choose web API
*/
(function(){
    var key = 'AIzaSyAq1_947d5bn2O6O0Ndp2OvDQk7f3lIQkE'; // User your own Key!

    //Load Google Maps Async
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp'
        + '&key=' + key
        + '&callback=initGoogleMaps';
    document.body.appendChild(script);

    this.initGoogleMaps = function(){
        this._googleMapsInitialized = true;
        GMap.init('container__maps');
        Utils.getGEOLocationByPromise().then(function(fromResolve){
            GMap.addMarkerGeoLocation(fromResolve);
        });
        var sports = Utils.getJSONByPromise('https://datatank.stad.gent/4/cultuursportvrijetijd/buurtsportlocaties.json').then(
                    function(data) {
                        var sports = data.features;
                    GMap.addMarkersForTreesInventory(sports);
                        
                        
                    },
                    function(status) {
                        console.log(status);
                    }
                );
    };

})();

var GMap = {
    "init": function(container) {
        var mapOptions = {
            zoom:13,
            center: new google.maps.LatLng(51.048017, 3.727666),
            streetViewControl: false,
            styles: [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"administrative.country","elementType":"labels.text.fill","stylers":[{"color":"#e5c163"}]},{"featureType":"administrative.locality","elementType":"labels.text.fill","stylers":[{"color":"#c4c4c4"}]},{"featureType":"administrative.neighborhood","elementType":"labels.text.fill","stylers":[{"color":"#e5c163"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21},{"visibility":"on"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#e5c163"},{"lightness":"0"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"labels.text.stroke","stylers":[{"color":"#e5c163"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#575757"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"labels.text.stroke","stylers":[{"color":"#2c2c2c"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#999999"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}]
        }
        this._map = new google.maps.Map(document.querySelector('#' + container), mapOptions);
        google.maps.visualRefresh = true;
        google.maps.event.trigger(this._map, 'resize');
        this._geoLocationMarker = null;
        this._markersTreesInventory = [];
        this._markerClusterTreesInventory = null;
        var kmlLayer = new google.maps.KmlLayer({
          url: 'http://www.samson-bambust.be/geoloc/Sportcentra.kmz',
          map: this._map,
          suppressInfoWindows:true 
        });
        kmlLayer.addListener('click', function(kmlEvent) {
          var text = kmlEvent.featureData.description;
          showInContentWindow(text);
        });

        function showInContentWindow(text) {
            $('.activity__detail--container').html(text);
            if($('.activityDetail__block').hasClass('offCanvas__bottom--hiddenDeep')){
                Navigator.closeDetail();
            }
            
        }
        
    },
    "addMarkerGeoLocation": function(geoLocation) {
        this._geoLocationMarker = new google.maps.Marker({
            position: new google.maps.LatLng(geoLocation.coords.latitude, geoLocation.coords.longitude),
            title:"My location",
            icon: "../assets/pins/yourloc.png"
        });// Create a Google Maps Marker

        this._geoLocationMarker.setMap(this._map);// Add Marker to Map
        this._map.setCenter(new google.maps.LatLng(geoLocation.coords.latitude, geoLocation.coords.longitude));// Set center of the map to my geolocation
    },
    "addMarkersForTreesInventory": function(trees){
        if(this._markersTreesInventory.length == 0) {
            var marker = null, self = this;

            _.each(trees, function(tree){
                var coordinates = [tree.geometry.coordinates[0],tree.geometry.coordinates[1]];
                var iconstring;
                switch(tree.properties.Sport){
                                case "Basketbal":
                                iconstring= "../assets/pins/basketball.png";
                                break;

                                case "Fitpoint":
                                iconstring= "../assets/pins/fitnessToestellen.png";

                                break;

                                case "Fitnesstoestellen":
                                iconstring= "../assets/pins/fitnessToestellen.png";
                                break;

                                case "Petanque":
                                iconstring= "../assets/pins/petanque.png";
                                break;

                                default:
                                iconstring= "../assets/pins/basketball.png";
                                break;
                               
                            }
                marker = new google.maps.Marker({
                        
                        position:new google.maps.LatLng(coordinates[1],coordinates[0]),
                    title:tree.properties.Sport,
                    icon:iconstring,
                    number:tree.properties.NUMMER,
                    name:tree.properties.Naam,
                    wijk:tree.properties.Wijk
                });// Create a Google Maps Marker
                marker.setMap(self._map);// Add Marker to Map
    
                self._markersTreesInventory.push(marker);
            });
            self.clickMarker(self._markersTreesInventory);
            
        }
    },
    "hideMarkers": function(arrMarkers, hide){
        var self = this;

        _.each(arrMarkers, function(marker){
            if(hide){
                marker.setMap(null);
            }else{
                marker.setMap(self.map);
            }
        });
    },
    "refresh": function() {
        google.maps.visualRefresh = true;
        google.maps.event.trigger(this.map,'resize');
    },
    "clickMarker": function(arrMarkers){
        var self = this;
        for(var i = 0; i<arrMarkers.length; i++){
            google.maps.event.addListener(arrMarkers[i],'click', function(e){
                $('.activity__detail--container').html("<p>"+this.title+"</p><p>"+this.name+" "+this.number+"<br>"+this.wijk+"</p><p>Buurtsportlocatie waar mogelijkheid is tot sportevenementen en groepssport.</p><p>Present users</p>");
                if($('.activityDetail__block').hasClass('offCanvas__bottom--hiddenDeep')){
                Navigator.closeDetail();
            }
            });
        }
    }
};