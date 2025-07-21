export {};

declare global {
    interface Window {
        startTour_dashboard?: () => void;
        startTour_entregas?: () => void;
        startTour_ordenes_produccion?: () => void;
        startTour_produccion?: () => void;
        startTour_caja?: () => void;
        startTour_usuarios?: () => void;
    }
}
