export interface CustomModalProps {
    open: boolean;
    handleClose: () => void;
    children: React.ReactNode;
}