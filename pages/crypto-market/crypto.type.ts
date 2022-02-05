
export interface Price {
    id: string;
    symbol: string;
    image: string;
    name: string;
    current_price: number;
    price_change_percentage_24h: number;
    market_cap: number;
    total_volume: number;
}

export interface PriceProps {
    initialPrice: Price[];
}