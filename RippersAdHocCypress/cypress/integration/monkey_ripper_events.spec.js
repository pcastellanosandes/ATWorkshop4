
describe('Los estudiantes under monkeys', function() {
    it('visits los estudiantes and execute: clicks or select combobox', function() {
        cy.visit('https://losestudiantes.co');
        cy.contains('Cerrar').click();
        cy.wait(1000);
        executeRandonEvent(20);
    })
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

function randomClickLink() {
    cy.get('a').then($links => {
        var randomLink = $links.get(getRandomInt(0, $links.length));
        if(!Cypress.Dom.isHidden(randomLink)) {
            cy.wrap(randomLink).click({force: true});
        }
    });
}

function randomClickButton() {
    cy.get('button').then($buttons => {
        var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
        if(!Cypress.Dom.isHidden(randomButton)) {
            cy.wrap(randomButton).click({force: true});
        }
    });
}

function randomTypeText() {
    cy.get('input').then($inputs => {
        var randomInput = $inputs.get(getRandomInt(0, $inputs.length));
        if(!Cypress.Dom.isHidden(randomInput)) {
            cy.wrap(randomInput).click({force: true}).type("test random typing");
        }
    });
}

function randomSelect() {
    cy.get('select').then($selects => {
        var selectRandom = $selects.get(getRandomInt(0, $selects.length));
        if(!Cypress.Dom.isHidden(selectRandom)) {
            var optionRandom = selectRandom.options[getRandomInt(0,selectRandom.options.length)].value;
            cy.wrap(selectRandom).select(optionRandom, {force: true});
        }
    });
}

function executeRandonEvent (maxEvents){
  var events= [randomClickLink,randomClickButton,randomTypeText,randomSelect];

  for (var i = 0; i < maxEvents; i++) {
       events[getRandomInt(0, events.length)]();
  }
}
