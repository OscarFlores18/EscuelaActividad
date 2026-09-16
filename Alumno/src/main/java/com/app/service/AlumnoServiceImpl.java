package com.app.service;

import com.app.dto.AlumnoConCursoDTO;
import com.app.model.Alumno;
import com.app.repository.AlumnoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlumnoServiceImpl implements AlumnoService {

    private final AlumnoRepository alumnoRepository;

    @Override
    public Alumno altaAlumno(Alumno alumno) {
        // tu implementación existente, sin tocar
        return alumnoRepository.save(alumno);
    }

    @Override
    public List<Alumno> listarAlumnos() {
        // tu implementación existente, sin tocar
        return alumnoRepository.findAll();
    }

    @Override
    public AlumnoConCursoDTO obtenerConCurso(Long alumnoId) {
        Alumno alumno = alumnoRepository.findById(alumnoId)
                .orElseThrow(() -> new RuntimeException("Alumno no encontrado con id: " + alumnoId));

        AlumnoConCursoDTO dto = new AlumnoConCursoDTO();
        dto.setId(alumno.getId());
        dto.setNombre(alumno.getNombre());
        dto.setApellido(alumno.getApellido());
        dto.setDni(alumno.getDni());
        dto.setEmail(alumno.getEmail());

        return dto;
    }
}