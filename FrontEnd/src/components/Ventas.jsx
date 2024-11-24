import React, { useEffect, useState } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import "../styles/Ventas.css";

const Ventas = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para formatear la fecha
  const formatDate = (date) => {
    const parsedDate = new Date(date + "T00:00:00");
    return parsedDate.toLocaleDateString("es-AR", { timeZone: "America/Argentina/Buenos_Aires" });
  };

  // Fetch de las ventas
  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch("http://localhost:4002/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Error al cargar las ventas");
        }

        const data = await response.json();
        setVentas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVentas();
  }, []);

  // Columnas de la tabla
  const columns = React.useMemo(
    () => [
      {
        Header: "Usuario",
        accessor: "user.email",
        Filter: TextFilter,
      },
      {
        Header: "Fecha",
        accessor: (row) => formatDate(row.date),
        id: "date",
        Filter: TextFilter,
      },
      {
        Header: "Productos",
        accessor: (row) =>
          row.orderItems
            .map(
              (item) =>
                `${item.product.description} (Cantidad: ${item.quantity})`
            )
            .join(", "),
        id: "products",
        Filter: TextFilter,
      },
      {
        Header: "Total Sin Desc",
        accessor: (row) => row.finalPrice.toFixed(2),
        id: "finalPrice",
        Filter: NumberFilter,
      },
      {
        Header: "Descuento",
        accessor: (row) =>
          row.finalPriceWithDiscount
            ? (row.finalPrice - row.finalPriceWithDiscount).toFixed(2)
            : "0.00",
        id: "discount",
        Filter: NumberFilter,
      },
      {
        Header: "Total Con Desc",
        accessor: (row) =>
          row.finalPriceWithDiscount
            ? row.finalPriceWithDiscount.toFixed(2)
            : row.finalPrice.toFixed(2),
        id: "finalPriceWithDiscount",
        Filter: NumberFilter,
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: ventas,
      initialState: { sortBy: [{ id: "date", desc: false }] },
    },
    useFilters,
    useSortBy
  );

  // Loading y errores
  if (loading) return <p>Cargando ventas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="ventas-container">
      <h2>Listado de Ventas</h2>
      <table {...getTableProps()} className="ventas-table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Componente de filtro para texto
function TextFilter({ column: { filterValue, setFilter } }) {
  return (
    <input
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder="Buscar..."
      style={{ width: "100%" }}
    />
  );
}

// Componente de filtro para números
function NumberFilter({ column: { filterValue, setFilter } }) {
  return (
    <input
      type="number"
      value={filterValue || ""}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder="Filtrar..."
      style={{ width: "100%" }}
    />
  );
}

export default Ventas;
