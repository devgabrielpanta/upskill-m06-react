const url = "http://localhost:3001/api/transactions";

export const getTransactions = async () => {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const createTransaction = async (payload) => {
  try {
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

    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTransaction = async (payload) => {
  try {
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

    const result = await response.json();
    console.log("result: ", result);

    return result;
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTransaction = async (transactionId) => {
  try {
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
  } catch (error) {
    console.log(error.message);
  }
};
