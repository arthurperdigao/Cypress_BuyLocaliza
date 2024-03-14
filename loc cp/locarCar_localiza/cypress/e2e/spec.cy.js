import accessValuer from './accessValuer.js';
import fillValuer from './fillValuer.js';

describe('template spec', () => {
  

  it('pesquisa "loc"', () => {
    cy.visit(accessValuer.linkLogin);
    
    function make_login(){

      cy.contains('E-mail ou CPF').should('be.visible').click();
      cy.get('input[name="Login"]').should('be.visible').type(accessValuer.mailLogin);
      cy.get('input[name=Password]').type(accessValuer.passLogin);
      cy.get('button:contains("Entrar")').click();
      cy.contains('a[data-testid="loc-login"]', 'LOGIN').should('be.visible').click(); //Aparentemente o site da localiza tem algum programa para impedir o login pela automação pois ele nao autentica ate tentar logar novamente, então logo apos logar clicamos no botao de login para autenticar.

    }
    make_login();
    function make_fill_request(){
      cy.contains('span.identity__name', 'ARTHUR').should('be.visible');
      cy.get('a[aria-label="allow cookies"]').should('exist').click();// se aparecer a mensagem de coockie aceite, se nao siga o codigo 


      cy.get('input[inputmode="search"]').should('be.visible').type(fillValuer.singleAgency);
      cy.contains('.places-list__item__name', fillValuer.agency).should('be.visible').click();
    
      cy.contains('.mat-calendar-body-cell-content', fillValuer.dateIn).scrollIntoView().should('be.visible').click();
      cy.get('#mat-option-7').should('be.visible').scrollIntoView().click(); // Substitua o ID conforme necessário, ID 4 quer dizer que seria o quarto horario disponivel, a contagem dos horarios começa da ida, mas vai conntinuando na volta, por exemplo, para ir tem apenas 09:00 as 10:00, para voltar tem 10:horas, o ID para voltar seria 3

      cy.contains('.mat-calendar-body-cell-content', fillValuer.dateOut).scrollIntoView().should('be.visible').click();
      //cy.get('#mat-option-7').should('be.visible').scrollIntoView().click();
      // pode acontecer da data de devolução existir na data da entrega, nesse caso o site preenche sozinho, caso queira simular um horario diferente basta especificar

      cy.contains('span', 'Continuar').scrollIntoView().should('be.visible').click({ force: true });

    }
    make_fill_request();

    function car_select(){
      cy.contains('h3', 'Grupo B - Compacto Com Ar', { timeout: 5000 }).siblings('ds-new-button').should('be.visible').click();// O método siblings() é usado para selecionar todos os elementos irmãos de um elemento no DOM que correspondem ao seletor especificado.
      cy.get('header.box-tipo-retirada__titulo p').contains('Com atendente no balcão').click();
      cy.contains('button', 'CONTINUAR').scrollIntoView().should('be.visible').click({ force: true });
      cy.contains('button', 'continuar sem proteção').should('be.visible').click({ force: true });

    }
    car_select();

    function payment_resquest(){
      cy.get('input[data-testid="input-checkbox-politicas-no-show"]').invoke('attr', 'value', 'true');//mudamos o valuer de false para true, assim fica preenchido de maneira mais eficaz 
      //para chegar na parte final e necessario confirmar algum meio de pagamento, essa parte irei deixar em branco para evitar cobraças indesejadas!
      cy.contains('button', 'Reservar').click();


    }

    payment_resquest();

  });
});