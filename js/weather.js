$( document ).ready(function() {
function WeatherWidget(id, parentContainer) {
    this.API_URL = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%3D12591774%20AND%20u%3D%22c%22&format=json&diagnostics=true&callback=';
    this.id = id;
    this.parentContainer = parentContainer;
    this.channel;

    this.loadData = function() {
      var that = this;

      Utils.getJSONPByPromise(this.API_URL).then(
        function(data) {
          that.channel = data.query.results.channel;
          that.updateUI();
        },
        function(error) {
          console.log(error);
        }
      );

    };

    this.updateUI = function() {
        
      var item = this.channel.item;
      var condition = item.condition;
      this.parentContainer.html('<p class="text__accent">Weather</p><p class="weather__date">'+condition.date+'</p><p class="weather__text">'+condition.text+'</p><p class="weather__temp">'+condition.temp+'C</p>');
    };

    this.toString = function() {
      return `Weather widget with id: ${this.id}`;
    };

  };

  var ww1 = new WeatherWidget(1, $('.activity__detail--weather'));
  ww1.loadData();
  
});