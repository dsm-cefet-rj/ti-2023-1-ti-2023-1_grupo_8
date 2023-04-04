

function Mesa(props) {
  const { numero, cadeiras, ocupada } = props;
  return (
    <div className={`mesa ${ocupada ? "ocupada" : "livre"}`}>
      <p>Mesa {numero}</p>
      <p>{cadeiras} cadeiras</p>
      <p>{ocupada ? 'Ocupada' : 'Livre'}</p>
    </div>
  );
  }

export default Mesa;
