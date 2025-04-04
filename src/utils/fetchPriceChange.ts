import axios from "axios";

export const fetchPriceChange = async (
    setLoading: (loading: boolean) => void,
    setPriceChange: (priceChange: number | null) => void,
    setError: (error: string | null) => void,
    setEthPrice: (price: number | null) => void,
    currency: string
  ) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/ethereum?localization=false`
      );
  
      const data = response.data;
      const priceChangePercentage =
        data.market_data.price_change_percentage_24h_in_currency[currency];
      const ethPrice = data.market_data.current_price[currency];
  
      if (typeof priceChangePercentage === "number") {
        setPriceChange(priceChangePercentage);
      } else {
        setError("Unable to fetch price change data.");
      }
  
      if (typeof ethPrice === "number") {
        setEthPrice(ethPrice);
      } else {
        setError("Unable to fetch Ethereum price.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "An error occurred while fetching the data."
      );
    } finally {
      setLoading(false);
    }
  };
  