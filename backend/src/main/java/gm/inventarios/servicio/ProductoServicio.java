package gm.inventarios.servicio;

import gm.inventarios.modelo.Producto;
import gm.inventarios.repositorio.IProductoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductoServicio implements IProductoServicio{

    @Autowired
    private IProductoRepositorio productoRepositorio;

    @Override
    public List<Producto> listarProductos() {
        return productoRepositorio.findAll();
    }

    @Override
    public Producto buscarProductoPorId(Integer id) {
        Producto producto = productoRepositorio.findById(id).orElse(null);
        return producto;
    }

    @Override
    public Producto guardarProducto(Producto producto) {
        return productoRepositorio.save(producto);
    }

    @Override
    public void eliminarProductoPorId(Integer id) {
        productoRepositorio.deleteById(id);
    }
}
