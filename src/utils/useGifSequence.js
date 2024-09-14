import { useEffect, useState } from "react";

export const useGifSequence = (images, interval) => {
    const [activeImage, setActiveImage] = useState(images[0]);  // Текущее активное изображение
    const [isLastImage, setIsLastImage] = useState(false);  // Флаг для остановки на последнем изображении

    useEffect(() => {
        let currentIndex = 0;

        const switchImage = () => {
            if (currentIndex < images.length - 1) {
                currentIndex++;  // Переход к следующему изображению
                setActiveImage(images[currentIndex]);
            } else {
                setIsLastImage(true);  // Достигли последнего изображения
            }
        };

        // Начинаем переключение только если не последнее изображение
        if (!isLastImage) {
            const imageTimeout = setTimeout(switchImage, interval);  // Меняем изображение через указанный интервал
            return () => clearTimeout(imageTimeout);  // Очищаем таймер при размонтировании
        }

    }, [activeImage, images, interval, isLastImage]);

    return activeImage;
};
