var Utils = {
    getParamsFromUrl: function(url) {
        var regex = /[?&]([^=#]+)=([^&#]*)/g,
            params = {},
            match;
        while(match = regex.exec(url)) {
            params[match[1]] = match[2];
        }
        return params;
    },
    getJSONByPromise: function(url) {
        return new Promise(function(resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('get', this.API_URL, true);
            xhr.responseType = 'json';
            xhr.onload = function() {
                if(xhr.status == 200) {
                    var data = (!xhr.responseType)?JSON.parse(xhr.response):xhr.response;
                    resolve(data);
                } else {
                    reject(status);
                }
            }
            xhr.onerror = function() {
                reject(Error('Network Error!'));
            }
            xhr.send();
        });
    },
    getJSONPByPromise: function(url) {
        
        url = url + '_' + new Date().getTime() + '_' + Math.round(new Date().getTime()/(Math.random()*10));
        
        var script = document.createElement('script');
        script.src = url;
        
        script.onload = function () {
            this.remove();
        };// After scripts is loaded and executed, remoe it from the DOM 
        
        var head = document.getElementsByTagName('head')[0];
        head.insertBefore(script, head.firstChild);// Insert script into the DOM
        
        var params = this.getParamsFromUrl(url);
        var callbackStr = 'json_callback';

        if(params['prefix']) {
            callbackStr = params['prefix'];
        } else if(params['callback']) {
            callbackStr = params['callback'];
        }

        return new Promise(function(resolve, reject) {
            window[callbackStr] = function(data) {
                resolve(data);
            }
        });
    },
    pluralize: function (count, word) {
        return count === 1 ? word : word + 's';
    },
    trim: function(str){
        return str.replace(/^\s+|\s+$/gm,'');
    },
    guid: function(){
        var i, random;
        var uuid = '';

        for (i = 0; i < 32; i++){
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
        }
        return uuid;
    },
    store: function(namespace, data) {
        if(arguments.length > 1) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        } else {
            var storedData = localStorage.getItem(namespace);
            return (storedData && JSON.parse(storedData)) || null;
        }
    },
    getAge: function(dayOfBirth) {
        var now = new Date();
        var thisYear = 0;
        if (now.getMonth() < dayOfBirth.getMonth()) {
            thisYear = 1;
        } else if ((now.getMonth() == dayOfBirth.getMonth()) && now.getDate() < dayOfBirth.getDate()) {
            thisYear = 1;
        }
        var age = now.getFullYear() - dayOfBirth.getFullYear() - thisYear;
        return age;
    },
    timeToTwitterDateTimeString: function(time){
        var now = new Date();
        var timediff = (now.getTime() - time)/1000;
        if(timediff < 60){
            return Math.floor(timediff) + 's';
        }
        else if(timediff < 3600){
            return Math.floor(timediff/60) + 'm';
        }
        else if(timediff < 3600*24){
            return Math.floor(timediff/3600) + 'h';
        }
        else if(timediff < 3600*24*7){
            return Math.floor(timediff/(3600*24)) + 'd';
        }
        else{
            return new Date(time).toLocaleDateString();
        }
    },
    calculateDistanceBetweenTwoCoordinates: function(lat1, lng1, lat2, lng2){
        var R = 6371; // km
        var lat1 = parseFloat(lat1);
        var lng1 = parseFloat(lng1);
        var lat2 = parseFloat(lat2);
        var lng2 = parseFloat(lng2);

        var dLat = (lat2-lat1).toRad();
        var dLon = (lng2-lng1).toRad();
        var lat1 = lat1.toRad();
        var lat2 = lat2.toRad();

        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c
        return d;//in km
    },
    getGEOLocationByPromise: function(){
        return new Promise(function(resolve, reject) {
            if(navigator){
                navigator.geolocation.getCurrentPosition(
                    function(position){
                        resolve(position);
                    },
                    function(error){
                        switch(error.code)
                        {
                            case error.PERMISSION_DENIED: console.log("User did not share geolocation data");break;
                            case error.POSITION_UNAVAILABLE: console.log("Could not detect current position");break;
                            case error.TIMEOUT: console.log("Retrieving position timed out");break;
                            default: console.log("Unknown Error");break;
                        }
                        reject(error);
                    },
                    {timeout:10000,enableHighAccuracy:true}
                )
            }
            else{
                reject("HTML5 Geolocation not supported!");
            }
        });
    }
}