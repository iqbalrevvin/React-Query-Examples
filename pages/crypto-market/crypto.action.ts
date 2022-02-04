export const getMarket = async () => {
    const URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=idr&per_page=10&sparkline=false';
    const response = await fetch(URL);
    if (!response.ok) {
        throw new Error('Fetching Error');
    }
    console.log(response);
    return await response.json();
}