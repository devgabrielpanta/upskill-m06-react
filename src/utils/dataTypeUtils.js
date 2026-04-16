// Utility function to analyze string chars (eg: includes)
export function normalizeStringCharacters(string) {
  return String(string)
    .normalize("NFD") // Splits accented characters (e.g., 'á' -> 'a' + '´')
    .replace(/[\u0300-\u036f]/g, "") // Removes the standalone accent marks
    .toLowerCase() // Converts to lowercase
    .replace(/\s+/g, ""); // Removes all whitespace (spaces, tabs, newlines)
}

export function formattedAmountCurrency(stringOrInteger) {
  if (typeof stringOrInteger === "number") {
    return formatNumericAmount(stringOrInteger);
  }
  return formatStringAmount(stringOrInteger);
}

export function formattedAmountNumber(currency) {
  const cleaned = String(currency)
    .replace("€", "")
    .replace(" ", "")
    .replace(",", ".")
    .replace("-", "");

  return parseFloat(cleaned);
}

// ====================================================================
//                           Helper Functions
// ====================================================================
function formatNumericAmount(num) {
  const integerPart = getIntegerPart(num);
  const decimalPart = getDecimalPart(num);
  return `€ ${integerPart},${decimalPart}`;
}

function formatStringAmount(str) {
  const digits = String(str).replace(/\D/g, "");
  if (!digits) return "€ 0,00";

  const normalized = digits.replace(/^0+/, "") || "0";
  if (normalized === "0") return "€ 0,00";

  const padded = normalized.padStart(3, "0");
  const intPart = padded.slice(0, -2);
  const decPart = padded.slice(-2);
  return `€ ${intPart},${decPart}`;
}

function getIntegerPart(num) {
  return String(Math.floor(Math.abs(num)));
}

function getDecimalPart(num) {
  const decimal = Math.round((Math.abs(num) % 1) * 100);
  return String(decimal).padStart(2, "0");
}
