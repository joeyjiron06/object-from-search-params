# object-from-search-params

This package is super tiny and parses a query params string into Javascript primitive types (i.e. numbers, booleans, arrays, etc.). It does not require a schema to do the parsing as the types are inferred using [JSON.parse()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse). It's meant to be a super tiny package where size is critical.

## Installation

```
npm install object-from-search-params
```

## Usage

```js
import objectFromSearchParams from 'object-from-search-params';

// use directly with a string
const myObject = objectFromSearchParams('?aNum=15&aBool=true&aString=hello');



const url = new URL('https://example.com?aNum=15&aBool=true&aString=hello');
// use with a searchParams object as well
const myObject = objectFromSearchParams(url.searchParams);

```

## Why this package?

There are amazing javascript APIs out there like [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams) and [Object.Entries](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries). When you combine them you can parse a query parameter string into an object, **BUT** the problem is that all the values are parsed as strings since URLSearchParams keeps the string types on all values. 

For Example, this code


```js
Object.fromEntries(new URLSearchParams('?aNum=15&aBool=true&aString=hello&aNull=null&anArray=1&anArray=two&anArray=3.0')) 
```
Produces an object like this:

```js
{
    aBool: "true",
    aNull: "null",
    aNum: "15",
    aString: "hello",
    anArray: "3.0"
}
```

There are 2 problems with the code above.

**Problem 1**, all the values are strings, when you probably want actual javascript values.

**Problem 2**, the `anArray` property only chose the last value in the query param, but what we want is for this to be a javascript array with all the values in the query parms.


This  package exists to solve these 2 problems listed above.

For example, this code

```js
import objectFromSearchParams from 'object-from-search-params';

objectFromSearchParams('?aNum=15&aBool=true&aString=hello&aNull=null&anArray=1&anArray=two&anArray=3.0')
```

Would produce this object

```js
{
    aNum: 15,
    aBool: true,
    aString: 'hello',
    aNull: null,
    anArray: [1, 'two', 3.0]
}
```


