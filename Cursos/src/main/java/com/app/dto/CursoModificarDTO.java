package com.app.dto;

public record CursoModificarDTO(
    String ciclo_lectivo,
    String division,
    String grado,
    String turno,
    String cupo_maximo
) {}