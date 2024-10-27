import { useMemo } from "react";

export const Hearder = (props) => {
  const {
    carrito,
    deleteItem,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  } = props;

  const isEmpty = useMemo(() => carrito.length === 0, [carrito]);

  const total = useMemo(
    () => carrito.reduce((acc, item) => acc + item.price * item.quatity, 0),
    [carrito]
  );
  return (
    <header className="bg-dark" style={{color:"white"}} >
      
        
        <nav className="container-xl "  >
          <ul className="nav-info">
            <li>Home</li>
            <li>Productos</li>
            <li>niciar sesión</li>
            
            <li>
              <div className="carrito">
                <img
                  className="img-fluid"
                  src="img/carrito.png"
                  alt="imagen carrito"
                />

                <div id="carrito" className="bg-white p-3">
                  {isEmpty ? (
                    <p className="text-center">El carrito esta vacio</p>
                  ) : (
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {carrito.map((item) => (
                            <tr key={item.id}>
                              <td>
                                <img
                                  className="img-fluid"
                                  src={item.image}
                                  alt="imagen guitarra"
                                />
                              </td>
                              <td>{item.name}</td>
                              <td className="fw-bold">${item.price}</td>
                              <td className="flex align-items-start gap-4">
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  onClick={() => decrementQuantity(item.id)}
                                >
                                  -
                                </button>
                                {item.quatity}
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  onClick={() => incrementQuantity(item.id)}
                                >
                                  +
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={() => deleteItem(item.id)}
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-end">
                        Total pagar: <span className="fw-bold">${total}</span>
                      </p>
                    </>
                  )}

                  <button
                    className="btn btn-dark w-100 mt-3 p-2"
                    onClick={() => clearCart()}
                  >
                    Vaciar Carrito
                  </button>

                  <button className="btn btn-dark w-100 mt-3 p-2">Pagar</button>
                </div>
              </div>
            </li>
          </ul>


        </nav>
      
    </header>
  );
};
