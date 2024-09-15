import { useEffect, useState } from "react";

export const useGifSequence = (images, interval, startAnimation) => {
    const [activeImage, setActiveImage] = useState(images[0]);
    const [isLastImage, setIsLastImage] = useState(false);

    useEffect(() => {
        let currentIndex = 0;

        const switchImage = () => {
            if (currentIndex < images.length - 1) {
                currentIndex++;
                setActiveImage(images[currentIndex]);
                console.log(`Switched to image: ${images[currentIndex]}`);
            } else {
                setIsLastImage(true);
                console.log("Reached the last image in the sequence.");
            }
        };

        if (startAnimation && !isLastImage) {
            const imageTimeout = setTimeout(switchImage, interval);
            return () => clearTimeout(imageTimeout);
        }
    }, [activeImage, images, interval, isLastImage, startAnimation]);

    console.log(`Current active image: ${activeImage}`);
    return activeImage;
};
