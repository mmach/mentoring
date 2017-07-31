const assert = require('assert');
const ONP = require('./test.js');

describe('Rnp',function(){
    it('should return 3 when the value is plus ( 1 2 +)',function(){
        assert.equal(3,ONP().calculate('1 2 +'))
    });

    it('should return 6 when the value is plus and multiple ( 2 1 2 + *)',function(){
        assert.equal(6,ONP().calculate('2 1 2 + *'))
    });
   
   it('should return 9 when the value is plus and multiple ( 2 1 + 3 *)',function(){
        assert.equal(9,ONP().calculate('2 1 + 3 *'))
    });

    it('should return 3 when the value is minus and multiple ( 2 1 - 3 *)',function(){
        assert.equal(3,ONP().calculate('2 1 - 3 *'))
    });

    it('should return 2 when string is 3 9 3 %',function(){
        assert.equal(2,ONP().calculate('5 3 %',ONP().extraOperation))
    });
    it('should return 3 when string is 1 2 3 % +',function(){
        assert.equal(3,ONP().calculate('1 2 3 % +',ONP().extraOperation))
    });
});