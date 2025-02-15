package gm.inventarios.repositorio;

import gm.inventarios.modelo.Producto;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IProductoRepositorio extends JpaRepository<Producto, Integer> {
}
