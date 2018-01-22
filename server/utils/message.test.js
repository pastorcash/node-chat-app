const expect = require('expect');

let {generateMessage} = require('./message');

describe('generateMessage', () => {
    it('Should genereate correct message object', () => {
        let from = 'Admin';
        let text ='MESSAGE Test';
        let message = generateMessage(from, text)
        
        expect(message.createdAt).toBeA('number');
        expect(message).toInclude({from, text});
    });

});