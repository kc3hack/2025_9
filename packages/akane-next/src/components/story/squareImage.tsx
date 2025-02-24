import Image from "next/image";
import { Box } from "@chakra-ui/react";
import type { StaticImageData } from "next/image";

type SquareImageProps = {
	// local画像をnext/imageのImageで仕様するために型を追加している
	src: string | StaticImageData;
	alt: string;
	size?: number;
	radius?: string;
};

/**
 * 正方形でない画像がトリミングされた正方形の画像になります。
 *
 * src: url, alt: string, size: number(pxはいらない),
 *
 * radius: string(chakra-uiのsizesで指定)
 *
 * @param param0
 * @returns
 */
const SquareImage: React.FC<SquareImageProps> = ({
	src,
	alt,
	size = 50,
	radius,
}) => {
	return (
		<Box
			width={`${size}px`}
			height={`${size}px`}
			position="relative"
			overflow="hidden"
			borderRadius={radius}
		>
			<Image src={src} alt={alt} layout="fill" objectFit="cover" />
		</Box>
	);
};

export default SquareImage;
