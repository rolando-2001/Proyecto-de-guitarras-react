import { useEffect, useState } from "react";
import { Hearder } from "./components/Hearder";
import { Guitarra } from "./components/Guitarra";
import { db } from "./data/db.js";
import axios from "axios";



function App() {

  const carritoStorage=() =>{
    const carrito=localStorage.getItem("carrito");
    return carrito ? JSON.parse(carrito) : [];
  }

  const [data, setdata] = useState(db);
  const [carrito, setCarrito] = useState(carritoStorage);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  function addTocart(items) {
    const exist = carrito.findIndex((item) => item.id === items.id);

    if (exist >= 0) {
      const updateCart = [...carrito];
      updateCart[exist].quatity++;
      setCarrito(updateCart);
    } else {
      items.quatity = 1;
      setCarrito([...carrito, items]);
      console.log("no existe");
    }
  }

  const deleteItem = (id) => {
    const newCart = carrito.filter((item) => item.id !== id);
    setCarrito(newCart);
  };

  const incrementQuantity = (id) => {
    const newCart = carrito.map((item) => {
      if (item.id === id && item.quatity < 5) {
        return { ...item, quatity: item.quatity + 1 };
      }
      return item;
    });

    setCarrito(newCart);
  };

  const decrementQuantity = (id) => {
    const newCart = carrito.map((item) => {
      if (item.id === id && item.quatity > 1) {
        return { ...item, quatity: item.quatity - 1 };
      }
      return item;
    });

    setCarrito(newCart);
  };

  const clearCart = () => {
    setCarrito([]);
  };

  useEffect(() => {
    const getGuitarra = async () => {
      const url = "http://localhost:3000/api/dish";
      const response = await axios.get(url);
      console.log(response.data);
    };
    getGuitarra();
    
  }, []);



  return (
    <>
      <Hearder
        
        carrito={carrito}
        deleteItem={deleteItem}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        clearCart={clearCart}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitarra) => (
            <Guitarra
              setCarrito={setCarrito}
              key={guitarra.id}
              guitarra={guitarra}
              addTocart={addTocart}
            />
          ))}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
