import Cookies from 'js-cookie';

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

export const getPrize = async (): Promise<any> => {
    try {
        const response = await fetch(`${URL}/api/prize`, {
            method: 'POST',
            body: JSON.stringify({
                receipt: Cookies.get('intGameReceipt'),
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
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
            body: JSON.stringify({
                receipt: Cookies.get('intGameReceipt'),
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error('Failed to check');
    }
};
