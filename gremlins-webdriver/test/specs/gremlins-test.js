function loadScript(callback) {
  var s = document.createElement('script');
  s.src = 'https://rawgithub.com/marmelab/gremlins.js/master/gremlins.min.js';
  if (s.addEventListener) {
    s.addEventListener('load', callback, false);
  } else if (s.readyState) {
    s.onreadystatechange = callback;
  }
  document.body.appendChild(s);
}

function elementsToFill(element){
    console.log(element);
}

function unleashGremlins(ttl, callback) {
  function stop() {
    horde.stop();
    callback();
  }
  var formFiller = window.gremlins.species.formFiller();

  formFiller.canFillElement(function (element){
        var isTextType = element.type == "text" || element.type == "password" || element.type == "textarea";
        return isTextType && !element.hidden;
    });


  var clicks = window.gremlins.species.clicker().clickTypes(['click']);

  clicks.canClick(function(element){
    var caDoClick = element.type=="button" || element.tagName=="A";
    return caDoClick && !element.hidden;
  });

  var horde = window.gremlins.createHorde();
  horde.gremlin(formFiller);
  horde.gremlin(clicks);
  horde.seed(1234);

)

  horde.after(callback);
  window.onbeforeunload = stop;
  setTimeout(stop, ttl);
  horde.unleash();
}



describe('Monkey testing with gremlins ', function() {

  it('it should not raise any error', function() {
    browser.url('/');
    browser.click('button=Cerrar');

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(loadScript);

    browser.timeoutsAsyncScript(60000);
    browser.executeAsync(unleashGremlins, 50000);
  });

  afterAll(function() {
    browser.log('browser').value.forEach(function(log) {
      browser.logger.info(log.message.split(' ')[2]);
    });
  });

});
