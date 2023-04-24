import { useState } from "react";
import Button from "react-bootstrap/Button";

const CheckButton = ({ pedido, onUpdateStatus }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusUpdate = () => {
    setIsLoading(true);
    onUpdateStatus(pedido.id)
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  };

  return (
    <Button
      variant="success"
      disabled={pedido.status === "pronto" || isLoading}
      onClick={handleStatusUpdate}
    >
      {isLoading ? "Atualizando..." : "Pronto"}
    </Button>
  );
};

export default CheckButton;
