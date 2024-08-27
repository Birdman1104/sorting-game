import { lego } from '@armathai/lego';
import { GLOBAL_DATA } from '../App';
import { DEFAULT_ERROR_MESSAGE } from '../configs/constants';
import { MainGameEvents } from '../events/MainEvents';

let cook: any;

export const fetchProductsData = async (): Promise<any> => {
    try {
        const response = await fetch(`${GLOBAL_DATA.URL}/api/products`);
        const json = await response.json();

        return json;
    } catch (error) {
        console.warn('Failed to fetch products data');
        
        lego.event.emit(MainGameEvents.Error, DEFAULT_ERROR_MESSAGE);
    }
};

export const getPrize = async (): Promise<any> => {
    try {
        const response = await fetch(`${GLOBAL_DATA.URL}/api/prizee`, {
            method: 'POST',
            body: JSON.stringify({
                receipt: cook,
                // receipt: Cookies.get('intGameReceipt'),
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
    cook = Math.floor(Math.random() * 1000000)
    console.log('cookie, ', cook)
    try {
        const response = await fetch(`${GLOBAL_DATA.URL}/api/check`, {
            method: 'POST',
            body: JSON.stringify({
                receipt: cook,
                // receipt: Cookies.get('intGameReceipt'),
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        return json;
    } catch (error) {
        console.warn('Failed to check');
        
        // @ts-ignore
        lego.event.emit(MainGameEvents.Error, error.message);
        throw new Error('Failed to check');
    }
};
