import { useState } from "react";
import Button from "react-bootstrap/Button";

const CheckButton = ({ pedido, onUpdateStatus }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusUpdate = async () => {
    setIsLoading(true);
    try {
      if (pedido) {
        const updatedPedido = { ...pedido, status: "pronto" };
        await onUpdateStatus(updatedPedido);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return (
    <Button
      variant="success"
      disabled={!pedido || pedido.status === "pronto" || isLoading}
      onClick={handleStatusUpdate}
    >
      {isLoading ? "Atualizando..." : "Pronto"}
    </Button>
  );
};

export default CheckButton;


