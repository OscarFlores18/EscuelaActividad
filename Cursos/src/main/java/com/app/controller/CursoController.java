package com.app.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.app.dto.CursoAltaDTO;
import com.app.dto.CursoConDocenteDTO;
import com.app.dto.CursoModificarDTO;
import com.app.model.Curso;
import com.app.service.CursoService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;

@RestController
@RequestMapping("/cursos")
@SecurityRequirement(name = "bearerAuth")

public class CursoController {

    private final CursoService cursoService;

    public CursoController(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    @PostMapping
    public ResponseEntity<Curso> altaCursos(@RequestBody CursoAltaDTO dto) {
        Curso nuevo = new Curso();
        nuevo.setCiclo_lectivo(dto.ciclo_lectivo());
        nuevo.setDivision(dto.division());
        nuevo.setGrado(dto.grado());
        nuevo.setTurno(dto.turno());
        nuevo.setCupo_maximo(dto.cupo_maximo());
        Curso creado = cursoService.altaCursos(nuevo);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    @GetMapping
    public ResponseEntity<List<Curso>> listarCursos() {
        return ResponseEntity.ok(cursoService.listarCursos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Curso> obtenerPorId(@PathVariable Long id) {
        return cursoService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Curso> modificarCurso(
            @PathVariable Long id,
            @RequestBody CursoModificarDTO dto) {

        return cursoService.modificarCurso(id, dto)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> eliminarCurso(@PathVariable Long id) {
        boolean eliminado = cursoService.eliminarCurso(id);

        if (!eliminado) {
            // Si no existe o tiene alumnos, no se elimina.
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("No se pudo eliminar: el curso no existe o tiene alumnos asociados.");
        }

        return ResponseEntity.noContent().build();
    }
   
    
}