import React from "react";

export default function Loading() {
  const display = false; // To be replaced by app loading state.

  if (!display) return null;

  return <div>Loading</div>;
}
