import { lego } from '@armathai/lego';
import Cookies from 'js-cookie';
import { GLOBAL_DATA } from '../App';
import { MainGameEvents } from '../events/MainEvents';

export const fetchProductsData = async (): Promise<any> => {
    try {
        const response = await fetch(`${GLOBAL_DATA.URL}/api/products`);
        const json = await response.json();

        return json;
    } catch (error) {
        lego.event.emit(MainGameEvents.Error, 'Failed to fetch data');
    }
};

export const getPrize = async (): Promise<any> => {
    try {
        const response = await fetch(`${GLOBAL_DATA.URL}/api/prizee`, {
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
        lego.event.emit(MainGameEvents.Error, 'Failed to get prize');
    }
};

export const check = async (): Promise<ServerCheck> => {
    try {
        const response = await fetch(`${GLOBAL_DATA.URL}/api/check`, {
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
        lego.event.emit(MainGameEvents.Error, 'Failed to check');
        throw new Error('Failed to check');
    }
};
