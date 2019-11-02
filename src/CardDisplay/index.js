import React from 'react';
import PropTypes from 'prop-types';

import Amex from './icons/Amex';
import Discover from './icons/Discover';
import Mastercard from './icons/Mastercard';
import Visa from './icons/Visa';

import styles from './CardDisplay.module.scss';

const amexID = 'amex';
const discoverID = 'discover';
const mastercardID = 'mc';
const visaID = 'visa';

/**
 *  List of tokens returned by getCardFromNumber
 */
const cardIDs = {
  amexID,
  discoverID,
  mastercardID,
  visaID
};

/**
 *  Returns the likely card type from the provided numbers. If there aren't
 *  enough numbers to tell, or the starting numbers don't represent one of the
 *  four basic card types ('amex', 'discover', 'mc' or 'visa'), or if the
 *  provided value isn't a string composed solely of numbers with optional
 *  spaces, it returns ''.
 *
 *  Card formats were provided by https://www.baymard.com/checkout-usability/credit-card-patterns
 */
function getCardFromNumber(number) {

  if (typeof number !== 'string') {
    return '';
  }

  let strippedNumber = number.replace(/[^0-9 ]/, '');
  if ( (strippedNumber.length === 0) || (strippedNumber !== number) ) {
    return '';
  }

  strippedNumber = strippedNumber.replace(/\D/, '');

  // The default case is handled by the bottom-of-function return. Duplicating that didn't make sense to me.
  // eslint-disable-next-line default-case
  switch (strippedNumber[0]) {
    case '2': { // Mastercard 222100-272099
      let mcNumbers = +(strippedNumber.substring(0, 6));
      if ((mcNumbers >= 222100) && (mcNumbers < 272100)) {
        return mastercardID;
      }
      break;
    }

    case '3': { // AMEX 34 or 37
      if (strippedNumber[1] === '4' || strippedNumber[1] === '7') {
        return amexID;
      }
      break;
    }

    case '4': { // VISA, all 4's
      return visaID;
    }

    case '5': { // Mastercard 51-55
      let mcNumbers = +(strippedNumber.substring(0, 2));
      if ( (mcNumbers >= 51) && (mcNumbers < 56) ) {
        return mastercardID;
      }
      break;
    }

    case '6': { // Discover: 6011, 622126-622925, 644-649, 65
      if ( (strippedNumber.substring(0, 2) === '65') || (strippedNumber.substring(0, 4) === '6011') ) {
        return discoverID;
      }

      let dNumbers = +(strippedNumber.substring(0, 3));
      if ( (dNumbers >= 644) && (dNumbers <= 649) ) {
        return discoverID;
      }
      dNumbers = +(strippedNumber.substring(0, 6));
      if ( (dNumbers >= 622126) && (dNumbers <= 622925) ) {
        return discoverID;
      }
      break;
    }
  }

  return '';

}

CardDisplay.propTypes = {
  /**
   *  If provided, overrides which card should currently be highlighted,
   *  ignoring the number property. Valid values are 'amex', 'discover', 'mc'
   *  and 'visa'.
   */
  active: PropTypes.string,
  /**
   *  Provides the credit card number from which to derive which card to
   *  highlight. If it contains any characters other than numbers and spaces,
   *  or the numbers do not create a valid card identification pattern, no
   *  card will be highlighted. Note that card types are not solely determined
   *  by the first digit in all cases.
   */
  number: PropTypes.string,
  /**
   *  Indicates whether the cards will appear in a square (the default) or in a
   *  line.
   */
  square: PropTypes.bool,
  /**
   *  Indicates whether highlighting takes place by expanding or by an opacity
   *  change (the default). When expanding (true), the square of four cards is
   *  replaced by a single large card. When the cards are displayed in line,
   *  the other three cards shrink and disappear, leaving only the highlighted
   *  card. When the opacity changes (false), the hiighlighted card remains
   *  opaque while the others become transparent.
   */
  expand: PropTypes.bool
};

function CardDisplay({square = true, expand = false, active = '', number = ''}) {
  // explicitly writing these out to filter invalid values
  const cardClassNames = {
    [amexID] : styles[amexID],
    [visaID] : styles[visaID],
    [mastercardID] : styles[mastercardID],
    [discoverID] : styles[discoverID]
  };

  const cardComponents = {
    [amexID] : <Amex/>,
    [visaID] : <Visa/>,
    [mastercardID] : <Mastercard/>,
    [discoverID] : <Discover/>
  };

  const cardArray = [visaID, mastercardID, amexID, discoverID];

  let baseClassName = square
    ? 'square'
    : 'container'
  ;
  if (expand) {
    baseClassName += '-expand';
  }

  let className = [styles[baseClassName]];

  const cardType = active || getCardFromNumber(number);
  let activeCard = cardClassNames[cardType];
  if (activeCard) {
    className.push(activeCard);
  }

  return (
    <div className={className.join(' ')}>
      {
        cardArray.map(id => (
          <div className={ cardClassNames[id] } key={id}>
          { cardComponents[id] }
          </div>
        ))
      }
    </div>
  );
}

export default CardDisplay;
export { cardIDs, getCardFromNumber };