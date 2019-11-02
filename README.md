# react-credit-card-display

A React component for displaying Visa, MasterCard, American Express and Discover cards in a form.

Import with

```js
import CardDisplay from 'react-credit-card-display';
```

and use it like

```jsx
<CardDisplay number="4321 0987 6543 2109"/>
```

Depending on the number provided, the appropriate icon will be highlighted. If the number doesn't match the appropriate pattern for any of the cards, all cards appear, waiting for a valid number.

## Usage

`react-credit-card-display` has the React Component, a helper function, and a map of ID's for use when programmatically highlighting a card.

```js
import CardDisplay from 'react-credit-card-display';
```
Imports the CardDisplay React component


```js
import { getCardFromNumber, cardIDs } from 'react-credit-card-display';
```
Imports the `getCardFromNumber` function and `cardIDs` map

### &lt;CardDisplay/>

The CardDisplay React component has a couple of attributes that change how the component presents itself and transforms when highlighting a specific card.

```jsx
<CardDisplay [square={true|false}] [expand={true|false}] number="string" active="amex|discover|mc|visa" />
```

#### `square`
Determines if the four cards are displayed as a square (true) or in a line (false). Defaults to displaying as a square.

#### `expand`
Determines if the highlighted card transforms via dimensions (true) or opacity (false). If true, the highlighted card expands to take over the entire square, or the other cards disappear from the line. If false, the highlighted card remains opaque, and the other cards fade in opacity, whether in square or line format.

#### `number`
The number to check for highlighting. __Note that card checking is not done just against the first number.__ Some cards that start with 5 or 6, for example, are not MasterCard or Discover, but are Diners Club or China UnionPay cards instead. Until enough numbers are provided to make a valid interpretation, no cards are highlighted.

#### `active`
If provided, this will override the `number` attribute and directly highlight the indicated card. It can take any one of the values provided by `cardIDs`. Any other values will be ignored.

### getCardFromNumber(number)

Used by <CardDisplay/> to determine which card is being presented by the provided string.

#### `number`
The string value to be interpreted. If it includes anything other than numbers and spaces, or it cannot determine the card from the provided numbers, it returns `''`. Otherwise it provides one of the identifiers provided by `cardIDs`.

This function determines the results based on the values provided by [https://www.baymard.com/checkout-usability/credit-card-patterns](https://www.baymard.com/checkout-usability/credit-card-patterns).

### cardIDs

The `cardIDs` export returns the following object:

```js
{
	amexID: 'amex',
	discoverID: 'discover',
	mastercardID: 'mc',
	visaID: 'visa'
}
```

## Requirements

CardDisplay uses React Hooks and therefore has peer dependencies to `react^16.8.0` and `react-dom^16.8.0`. It also relies on `prop-types^15.6.0`.

## License info

This project is licensed under a MIT license, found [here](./LICENSE.md).

The SVG card icons are the property of [Volusion Services](https://codepen.io/volusion/pen/ogqWoj). Their license can be found there. 