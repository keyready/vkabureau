import { memo } from 'react';
import { Toaster as ReactHotToaster } from 'react-hot-toast';

import classes from './Toaster.module.scss';

import { classNames } from '@/shared/lib/classNames';

interface ToasterProps {
    className?: string;
}

export const Toaster = memo((props: ToasterProps) => {
    const { className } = props;

    return (
        <ReactHotToaster
            containerClassName={classNames(classes.Toaster, {}, [className])}
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerStyle={{}}
            toastOptions={{
                className: '',
                style: {
                    background: 'linear-gradient(139deg, #FFF9E7 0%, #C7D5E3 100%)',
                    color: '#303030',
                    fontWeight: 'bold',
                    textAlign: 'center',
                },
            }}
        />
    );
});
