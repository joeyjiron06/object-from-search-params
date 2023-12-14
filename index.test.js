const tinyQueryParamParser = require("./index");
const test = require('node:test');
const assert = require('node:assert');

test('should return an object', () => {
    const result = tinyQueryParamParser('');
    assert.equal(typeof result, 'object');
});

test('should parse all primitive types', () => {
    const result = tinyQueryParamParser('?aNum=15&aBool=true&aString=hello&aNull=null');
    assert.deepEqual(result, {
        aNum: 15,
        aBool: true,
        aString: 'hello',
        aNull: null,
    })
});

test('should parse arrays', () => {
    const result = tinyQueryParamParser('?aList=1&aList=two&aList=3.0&aList=false');
    assert.deepEqual(result, {
        aList: [1, 'two', 3.0, false]
    })
});

test('should parse url search params', () => {
    const url = new URL('https://example.com?hello=world')
    const result = tinyQueryParamParser(url.searchParams);
    assert.deepEqual(result, {
        hello: 'world'
    })
});
