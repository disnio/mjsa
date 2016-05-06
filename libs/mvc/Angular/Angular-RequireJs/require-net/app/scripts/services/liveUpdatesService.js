define(['services/services'],
  function (services) {
      services.factory('LiveUpdatesService', ['$window',
      function (win) {

          var subject = new Rx.Subject();
        
          if ("WebSocket" in window) {
              //win.alert('SOCKETS ARE OK');
              
              // create a new websocket and connect
              //var ws = new WebSocket('ws://localhost:8181/consoleappsample', 'my-protocol');
              var ws = new WebSocket('ws://localhost:8181/publisher', 'my-protocol');

              // when data is comming from the server, this metod is called
              ws.onmessage = function (evt) {
                  subject.onNext(evt.data);
              };

              // when the connection is established, this method is called
              ws.onopen = function () {
                  win.alert('Websocket connection opened');
              };

              //// when the connection is closed, this method is called
              ws.onclose = function () {
                  subject.onError('Websocket connection closed, perhaps you need to restart the Publisher, and refresh web site');
              };
          }


          return {

              publishEvent: function (value) {
                  subject.onNext(value);
              },
              eventsStream: function () {
                  return subject.asObservable();
              }
          };
      }]);
  });


