export function formattedAmountCurrency(stringOrInteger) {
  const stringDigits = getStringNumberChars(stringOrInteger);

  const amountNumber = parseNonDecimalAmount(stringDigits);
  const amountDecimal = parseDecimalAmount(stringDigits);

  return "€ " + amountNumber + "," + amountDecimal;
}

// ====================================================================
//                           Helper Functions
// ====================================================================

function getStringNumberChars(stringOrInteger) {
  const amountString = String(stringOrInteger);
  const regexNumbers = /^\d+$/;

  let stringDigits = "";

  for (let index = 0; index <= amountString.length; index++) {
    const char = String(amountString.charAt(index));
    if (regexNumbers.test(char)) {
      stringDigits = String(stringDigits) + char;
    }
  }

  return stringDigits;
}

function parseNonDecimalAmount(stringDigits) {
  let amountNumber = stringDigits.slice(0, stringDigits.length - 2);

  switch (amountNumber.length) {
    case 0:
      amountNumber = "0";
      break;
    default:
      amountNumber = String(Number(amountNumber));
  }

  return amountNumber;
}

function parseDecimalAmount(stringDigits) {
  let amountDecimal = stringDigits.slice(
    stringDigits.length - 2,
    stringDigits.length,
  );

  switch (amountDecimal.length) {
    case 0:
      amountDecimal = "00";
      break;
    case 1:
      amountDecimal = `0${amountDecimal}`;
      break;
  }

  return amountDecimal;
}
