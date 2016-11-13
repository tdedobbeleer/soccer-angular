import { SoccerAppPage } from './app.po';

describe('soccer-app App', function () {
    let page:SoccerAppPage;

    beforeEach(() => {
        page = new SoccerAppPage();
    });

    it('should display message saying app works', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('app works!');
    });
});
