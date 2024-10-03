import { RiUser4Line } from '@remixicon/react';
import { Image } from '@nextui-org/react';

import { classNames } from '@/shared/lib/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Project } from '@/entities/Project';

interface AuthorBlockProps {
    className?: string;
    project?: Project;
}

export const AuthorBlock = (props: AuthorBlockProps) => {
    const { className, project } = props;

    return (
        <VStack
            justify="between"
            align="center"
            className={classNames('p-5 rounded-xl bg-white', {}, [className])}
            maxW
            gap="8px"
        >
            <HStack maxW>
                <RiUser4Line className="text-accent" size={18} />
                <h2 className="text-l text-black">Автор</h2>
            </HStack>
            <HStack maxW gap="8px">
                <Image src={project?.author.avatar} width={25} radius="full" />
                <h2 className="text-black">{project?.author.name}</h2>
            </HStack>
        </VStack>
    );
};
