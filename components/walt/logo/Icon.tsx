import Image from 'next/image';

type Props = {
    height: number;
    width: number;
    className?: string;
};

export default function ICIcon({
    width,
    height,
    className,
}: Props) {
    return (
        <Image
            src="https://www.infocert.it/content/uploads/2021/09/logo.svg"
            alt="Logo"
            width={width}
            height={height}
            className={className}
        />
    )
}
