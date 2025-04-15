import Image, { ImageProps } from 'next/image';

export default function Logo(props: Omit<ImageProps, 'src' | 'alt'>) {
  return (
    <Image
      src="/logo.png"
      alt="MindByteAI Logo"
      width={228}
      height={24}
      {...props}
    />
  );
}
