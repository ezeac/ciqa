import { CiqaPage } from './app.po';

describe('ciqa App', function() {
  let page: CiqaPage;

  beforeEach(() => {
    page = new CiqaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
