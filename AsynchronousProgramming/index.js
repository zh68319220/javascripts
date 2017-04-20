var text = document.querySelectorAll("#search")

Rx.Observable.fromEvent(text, 'keyup')
              .debounce(200)
              .pluck('target', 'value')
              .flatMapLatest(function(url){
                $.ajax({
                  url: url,
                  method: 'GET'
                })
              })
              .subscribe(function(data){
                console.log(data);
              });