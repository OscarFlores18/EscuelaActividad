package com.app.dto;

import com.app.Enum.Cargo;

public record PersonalModificarDTO(
    String nombre,
    String apellido,
    String email,
    Cargo cargo
) {}