package gm.inventarios.excepcion;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Creamos una clase de excepción personalizada.
// Necesitamos esta notación porque es una respuesta tipo REST:
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class RecursoNoEncontradoExcepcion extends RuntimeException{

    public RecursoNoEncontradoExcepcion(String mensaje){
        // Esto llama al constructor de RuntimeException y le pasa el mensaje:
        super(mensaje);
    }
}
