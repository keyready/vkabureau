import { useWindowSize } from '@uidotdev/usehooks';

export function useWindowWidth() {
    const { width: windowWidth } = useWindowSize();

    return windowWidth ?? 0;
}
