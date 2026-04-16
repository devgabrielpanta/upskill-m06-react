const url = "http://localhost:3001/api/transactions";

export const getTransactions = async () => {
  const response = await fetch(url, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json();
};

export const createTransaction = async (payload) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json();
};

export const updateTransaction = async (payload) => {
  const response = await fetch(`${url}/${payload.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return await response.json();
};

export const deleteTransaction = async (transactionId) => {
  const response = await fetch(`${url}/${transactionId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  await response.json();

  return transactionId;
};
