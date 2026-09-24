package com.app.service;

import com.app.dto.AlumnoConCursoDTO;
import com.app.dto.AlumnoModificarDTO;
import com.app.model.Alumno;
import com.app.repository.AlumnoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AlumnoServiceImpl implements AlumnoService {

    private final AlumnoRepository alumnoRepository;

    public AlumnoServiceImpl(AlumnoRepository alumnoRepository) {
        this.alumnoRepository = alumnoRepository;
    }

    @Override
    public Alumno altaAlumno(Alumno alumno) {
        return alumnoRepository.save(alumno);
    }

    @Override
    public List<Alumno> listarAlumnos() {
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
    
    
    @Override
    public Optional<Alumno> modificarAlumno(
            Long id,
            AlumnoModificarDTO dto) {

        return alumnoRepository.findById(id)
            .map(alumno -> {
                alumno.setNombre(dto.nombre());
                alumno.setApellido(dto.apellido());
                alumno.setDni(dto.dni());
                alumno.setEmail(dto.email());

                return alumnoRepository.save(alumno);
            });
    }

    @Override
    public boolean eliminarAlumno(Long id) {

        if (!alumnoRepository.existsById(id)) {
            return false;
        }

        alumnoRepository.deleteById(id);
        return true;
    }
    
}