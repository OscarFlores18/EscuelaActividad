package com.app.security;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class GatewaySecretFilter extends OncePerRequestFilter {

    private static final String HEADER = "X-Gateway-Secret";

    private final String gatewaySecret;

    public GatewaySecretFilter(String gatewaySecret) {
        this.gatewaySecret = gatewaySecret;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        String recibido = request.getHeader(HEADER);

        if (!esValido(recibido)) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write(
                    "{\"error\":\"Peticion directa al microservicio denegada. Debe tramitarse a traves del Gateway.\"}"
            );
            return;
        }

        filterChain.doFilter(request, response);
    }

    private boolean esValido(String recibido) {
        if (!StringUtils.hasText(gatewaySecret) || !StringUtils.hasText(recibido)) {
            return false;
        }
        return MessageDigest.isEqual(
                gatewaySecret.getBytes(StandardCharsets.UTF_8),
                recibido.getBytes(StandardCharsets.UTF_8)
        );
    }
}