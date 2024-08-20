const URL = 'https://game.intdevels.ru';

export const fetchProductsData = async (): Promise<any> => {
    try {
        const response = await fetch(`${URL}/api/products`);
        const json = await response.json();

        return json;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

export const check = async (): Promise<ServerCheck> => {
    try {
        const response = await fetch(`${URL}/api/check`, {
            method: 'POST',
        });
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error('Failed to check');
    }
};
