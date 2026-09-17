package com.app.dto;

import com.app.enums.Cargo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DocenteDTO {
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private Cargo cargo;
}