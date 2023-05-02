import { useState } from "react";
import Button from "react-bootstrap/Button";

const CheckButton = ({ pedido, onUpdateStatus }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusUpdate = async () => {
    setIsLoading(true);
    try {
      if (pedido) {
        const updatedPedido = { ...pedido, status: "entregue" };
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
      disabled={!pedido || pedido.status === "entregue" || isLoading}
      onClick={handleStatusUpdate}
    >
      {isLoading ? "Atualizando..." : "entregue"}
    </Button>
  );
};

export default CheckButton;