import ContentLoader from 'react-content-loader';

interface SkeletonProps {
    width: number | string;
    height: number | string;
    rounded?: number | string;
    className?: string;
    dark?: boolean;
}

export const Skeleton = (props: SkeletonProps) => {
    const { className, dark, height, rounded = 4, width } = props;

    return (
        <ContentLoader
            speed={2}
            width={width}
            height={height}
            viewBox={`0 0 ${width} ${height}`}
            backgroundColor={dark ? '#BFBFBF' : '#e2e2e2'}
            foregroundColor={dark ? '#DFDFDF' : '#f1f1f1'}
            className={className}
        >
            <rect x="0" y="0" rx={rounded}
ry={rounded} width="100%" height="100%" />
        </ContentLoader>
    );
};
