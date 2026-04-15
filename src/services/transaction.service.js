import { normalizeStringCharacters } from "../utils/dataTypeUtils";

export const defaultTransactionParams = {
  search: "",
  sortBy: "date", // date | amount | category
  sortOrder: "asc", // asc | desc
  filterType: "all", // all | income | expense
  selectedCategories: [],
};

/**
 * @param {Object} params - search, sortBy, sortOrder, filterType, selectedCategories
 * @param {Array} filteredTransactions - Array of transaction objects.
 */
export function sortFilterTransaction(params, transactionsList) {
  const filtered = filteredTransactions(params, transactionsList);
  const sorted = sortedTransactions(params, filtered);
  return sorted;
}

function filteredTransactions(params, transactionsList) {
  let filtered = transactionsList;
  filtered = filterByQuery(params.search, transactionsList);
  filtered = filterByCategory(params.selectedCategories, filtered);
  filtered = filterByType(params.filterType, filtered);
  return filtered;
}

function sortedTransactions(params, transactionsList) {
  const sortOrder = params.sortOrder;
  const sortBy = params.sortBy;

  switch (sortBy) {
    case "date":
      return sortByDate(sortOrder, transactionsList);
    case "amount":
      return sortByAmount(sortOrder, transactionsList);
    case "category":
      return sortByCategory(sortOrder, transactionsList);
  }
}

// ================================================================
//                 [FILTERS] HELPER FUNCTIONS
// ================================================================

function filterByQuery(query, transactionsList) {
  const queryString = String(query);
  if (queryString.length === 0) return transactionsList;

  const parsedQuery = normalizeStringCharacters(queryString);

  return transactionsList.filter((transaction) => {
    for (const key in transaction) {
      const parsedString = normalizeStringCharacters(transaction[key]);

      if (parsedString.includes(parsedQuery)) {
        return true; // Early returning since a key contains the query
      }
    }
    return false; // No key's value matche the query
  });
}

function filterByCategory(selectedCategories, transactionsList) {
  if (selectedCategories.length === 0) return transactionsList;

  return transactionsList.filter((transaction) =>
    selectedCategories.some((categ) => categ === transaction.category),
  );
}

function filterByType(type, transactionsList) {
  if (type === "all") return transactionsList;

  return transactionsList.filter((transaction) => transaction.type === type);
}

// ================================================================
//                 [SORT] HELPER FUNCTIONS
// ================================================================
function sortByDate(sortOrder, transactionsList) {
  return [...transactionsList].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    if (sortOrder === "asc") {
      return dateA - dateB;
    } else {
      return dateB - dateA;
    }
  });
}

function sortByAmount(sortOrder, transactionsList) {
  return [...transactionsList].sort((a, b) => {
    const valueA =
      a.type === "income" ? Number(a.amount) : Number(a.amount) * -1;
    const valueB =
      b.type === "income" ? Number(b.amount) : Number(b.amount) * -1;

    if (sortOrder === "asc") {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });
}

function sortByCategory(sortOrder, transactionsList) {
  return [...transactionsList].sort((a, b) => {
    const stringA = String(a.category);
    const stringB = String(b.category);

    if (sortOrder === "asc") {
      return stringA.localeCompare(stringB);
    } else {
      return stringB.localeCompare(stringA);
    }
  });
}
