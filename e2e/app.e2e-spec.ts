import { DgmPage } from './app.po';

describe('dgm App', () => {
  let page: DgmPage;

  beforeEach(() => {
    page = new DgmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
