import Head from '../../models/HeadModel';

export const onSubmitButtonClickedCommand = () => {
    Head.gameModel?.validation?.checkCode();
};

export const isConfirmedUpdateCommand = (confirmed: boolean): void => {
    if (Head.gameModel?.validation) {
        // @ts-ignore
        Head.gameModel?.validation?.isConfirmed = '';
        Head.gameModel?.validation?.clearTypedText();
    }
};
