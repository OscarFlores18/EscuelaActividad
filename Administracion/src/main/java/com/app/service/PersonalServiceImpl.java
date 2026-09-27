package com.app.service;

import java.util.List;
import java.util.Optional;
import com.app.dto.PersonalModificarDTO;
import org.springframework.stereotype.Service;
import com.app.model.Personal;
import com.app.repository.PersonalRepository;

@Service
public class PersonalServiceImpl implements PersonalService {

    private final PersonalRepository personalRepository;

    public PersonalServiceImpl(PersonalRepository personalRepository) {
        this.personalRepository = personalRepository;
    }

    @Override
    public Personal altaPersonal(Personal personal) {
        personal.setId(null); // el alta nunca acepta un id externo — lo genera la base
        return personalRepository.save(personal);
    }

    @Override
    public List<Personal> listarPersonal() {
        return personalRepository.findAll();
    }

	@Override
	public Optional<Personal> obtenerPorId(Long id) {
        return personalRepository.findById(id);
	
	}
	
	@Override
	public Optional<Personal> modificarPersonal(Long id, PersonalModificarDTO dto) {
	    return personalRepository.findById(id).map(personal -> {
	        personal.setNombre(dto.nombre());
	        personal.setApellido(dto.apellido());
	        personal.setEmail(dto.email());
	        personal.setCargo(dto.cargo());

	        return personalRepository.save(personal);
	    });
	}

	@Override
	public boolean eliminarPersonal(Long id) {
	    if (!personalRepository.existsById(id)) {
	        return false;
	    }

	    personalRepository.deleteById(id);
	    return true;
	}
	
	
	
	

}