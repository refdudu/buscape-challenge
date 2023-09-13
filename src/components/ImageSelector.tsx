interface ImageSelectorProps {
    images: string[];
    onClick: (image: string) => void;
    selectedImage: string;
}

export function ImageSelector({
    images,
    onClick,
    selectedImage
}: ImageSelectorProps) {
    //   if (images.length === 1) return <></>;
    return (
        <div
            className="absolute  gap-2 flex flex-col transition left-2
                md:bottom-4 md:flex-row md:hidden md:group-hover:flex md:left-[50%] md:translate-x-[-50%]
    "
        >
            {images.map(image => {
                const isSelectedImage = selectedImage === image;
                return (
                    <div
                        key={image}
                        className={`flex w-12 h-12
            ${
                isSelectedImage ? "bg-hover hover:cursor-not-allowed" : ""
            } cursor-pointer border-cyan-500 border transition rounded`}
                        onClick={() => !isSelectedImage && onClick(image)}
                    >
                        <img
                            src={image}
                            className="flex-1 p-1 object-contain"
                        />
                    </div>
                );
            })}
        </div>
    );
}
