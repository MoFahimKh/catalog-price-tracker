export const formatAddress = (address:string) => {
  const trimmedAddress =
    address.substring(0, 4) +
    "..." +
    address.substring(address.length - 7, address.length);
  return trimmedAddress;
};
