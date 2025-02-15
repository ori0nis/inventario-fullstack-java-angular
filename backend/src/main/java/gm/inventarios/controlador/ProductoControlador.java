package gm.inventarios.controlador;

import gm.inventarios.excepcion.RecursoNoEncontradoExcepcion;
import gm.inventarios.modelo.Producto;
import gm.inventarios.servicio.ProductoServicio;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

// A diferencia de otros proyectos, no utilizamos @Controller porque esta vez nuestro controlador se va a
// combinar con Angular. Mientras que Thymeleaf o JSP necesitan recibir nombres de vistas que luego resuelven
// sirviendo páginas HTML enteras, Angular interactúa con el backend a través de sus HTTP requests, que se crean
// con REST endpoints. Es decir, Angular no consume nombres de vistas con los que sirve HTML, sino datos en
// formato JSON.

// @RestController = @Controller + @ResponseBody (todos los métodos devuelven datos en JSON)
@RestController
// Este context path va a valer para todas las URLs:
// http://localhost:8080/inventario-app
@RequestMapping("inventario-app")
// Aprovechamos para agregar la notación que permite las peticiones de Angular:
@CrossOrigin(value = "http://localhost:4200") // Puerto por default de Angular
public class ProductoControlador {

    private static final Logger logger = LoggerFactory.getLogger(ProductoControlador.class);

    @Autowired
    private ProductoServicio productoServicio;

    @GetMapping("/productos")
    public List<Producto> obtenerProductos(){
        List<Producto> productos = productoServicio.listarProductos();
        logger.info("Productos obtenidos: " + productos);
        productos.forEach((producto) -> logger.info(producto.toString()));
        return productos;
    }

    @PostMapping("/productos")
    // Como recibimos la info desde un formulario de Angular, la pedimos:
    public Producto agregarProducto(@RequestBody Producto producto){
        logger.info("Producto a agregar: " + producto);
        return productoServicio.guardarProducto(producto);
    }

    @GetMapping("/productos/{id}")
    // Envolvemos el producto en este objeto para que Spring pueda retornarlo correctamente:
    public ResponseEntity<Producto> obtenerProductoPorId(@PathVariable int id){
        Producto producto = productoServicio.buscarProductoPorId(id);
        if(producto != null){
            return ResponseEntity.ok(producto);
        } else {
            throw new RecursoNoEncontradoExcepcion("No se encontró el id: " + id);
        }
    }

    // Ahora ya modificamos un registro existente:
    @PutMapping("/productos/{id}")
    public ResponseEntity<Producto> actualizarProducto(@PathVariable int id,
                                                       @RequestBody Producto productoRecibido){
        Producto producto = productoServicio.buscarProductoPorId(id);
        if(producto == null){
            throw new RecursoNoEncontradoExcepcion("No se encuentra el id: " + id);
        }
        producto.setNombre(productoRecibido.getNombre());
        producto.setPrecio(productoRecibido.getPrecio());
        producto.setExistencias(productoRecibido.getExistencias());
        productoServicio.guardarProducto(producto);
        return ResponseEntity.ok(producto);
    }

    @DeleteMapping("/productos/{id}")
    public ResponseEntity<Map<String, Boolean>> eliminarProducto(@PathVariable int id){
        Producto producto = productoServicio.buscarProductoPorId(id);
        if(producto == null){
            throw new RecursoNoEncontradoExcepcion("No se encuentra el id: " + id);
        }
        productoServicio.eliminarProductoPorId(producto.getId());
        Map<String, Boolean> respuesta = new HashMap<>();
        respuesta.put("eliminado", Boolean.TRUE);
        return ResponseEntity.ok(respuesta);
    }
}
