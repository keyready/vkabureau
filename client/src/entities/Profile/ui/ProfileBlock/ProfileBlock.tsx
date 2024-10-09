import { classNames } from '@/shared/lib/classNames';

interface ProfileBlockProps {
    className?: string;
}

export const ProfileBlock = (props: ProfileBlockProps) => {
    const { className } = props;

    return (
        <div className={classNames('grid grid-cols-3 gap-4', {}, [className])}>
            <div className="col-span-2 bg-red-200">
                <h1>Ваш профиль</h1>
            </div>
        </div>
    );
};
