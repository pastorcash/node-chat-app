const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./message');


describe('generateMessage', () => {
    it('Should genereate correct message object', () => {
        let from = 'Admin';
        let text ='MESSAGE Test';
        let message = generateMessage(from, text)
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });

});

describe('generateLocationMessage', () => {
    it('Should generate correct location object', () => {
        let from = 'Admin';
        let latitude = 1;
        let longitude = 1;
        let message = generateLocationMessage(from, latitude, longitude);
        let url = 'https://www.google.com/maps?q=1,1'

        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, url});
    });
});