import { lego } from '@armathai/lego';
import { GLOBAL_DATA } from '../App';
import { DEFAULT_ERROR_MESSAGE } from '../configs/constants';
import { MainGameEvents } from '../events/MainEvents';

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
