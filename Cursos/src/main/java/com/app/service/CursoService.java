package com.app.service;

import java.util.List;
import java.util.Optional;

import com.app.dto.CursoConDocenteDTO;
import com.app.dto.CursoModificarDTO;
import com.app.model.Curso;

public interface CursoService {
    Curso altaCursos(Curso curso);
    void registrarALumno(long idCurso,long idAlumno);
    void sacarALumno(long idCurso,long idAlumno);
    List<Curso> listarCursos();
    Optional<Curso> obtenerPorId(Long id);
    Optional<Curso> modificarCurso(Long id, CursoModificarDTO dto);
    boolean eliminarCurso(Long id);
}