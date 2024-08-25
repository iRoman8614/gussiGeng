export const triggerVibration = (duration = 50) => {
    if (navigator.vibrate) {
        navigator.vibrate(duration);
    }
};

//В этом примере pattern — это массив, где нечетные элементы определяют длительность вибрации, а четные — паузу между вибрациями.
export const Vibration = (pattern = [50]) => {
    if (navigator.vibrate) {
        navigator.vibrate(pattern);
    }
};
