import { useState } from 'react';
import PopUpBox from '@/components/PopUpBox';

export function usePopUp() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState(null); // Optional data to pass to the popup

    const open = (payload = null) => {
        if (payload) setData(payload);
        setIsOpen(true);
    };

    const close = () => {
        setIsOpen(false);
        setData(null);
    };

    const PopUp = ({ children, ...props }) => (
        <PopUpBox
            {...props}
            isOpen={isOpen}
            onClose={() => {
                close();
                if (props.onClose) props.onClose();
            }}
        >
            {/* If children is a function, pass data */}
            {typeof children === 'function' ? children(data) : children}
        </PopUpBox>
    );

    return { PopUp, open, close, isOpen, data };
}
