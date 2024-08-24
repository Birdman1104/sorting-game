import { lego } from '@armathai/lego';
import Cookies from 'js-cookie';
import { GLOBAL_DATA } from '../App';
import { DEFAULT_ERROR_MESSAGE } from '../configs/constants';
import { MainGameEvents } from '../events/MainEvents';

export const fetchProductsData = async (): Promise<any> => {
    try {
        const response = await fetch(`${GLOBAL_DATA.URL}/api/products`);
        const json = await response.json();

        return json;
    } catch (error) {
        lego.event.emit(MainGameEvents.Error, DEFAULT_ERROR_MESSAGE);
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
        // @ts-ignore
        lego.event.emit(MainGameEvents.Error, error.message);
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
        // @ts-ignore
        lego.event.emit(MainGameEvents.Error, error.message);
        throw new Error('Failed to check');
    }
};
