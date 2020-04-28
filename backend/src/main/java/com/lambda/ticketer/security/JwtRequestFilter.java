package com.lambda.ticketer.security;

import com.lambda.ticketer.users.UserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.CollectionUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtils jwtUtils;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

            String username = null;
            String jwt = null;


            List<Cookie> cookies = new ArrayList<>(Arrays.asList(
                (request.getCookies() != null) ? request.getCookies() : new Cookie[0]));
            CollectionUtils.filter(cookies, c -> ((Cookie) c).getName().equals("token"));


            if(cookies.size() > 0) {
                jwt = cookies.get(0).getValue();
                username = jwtUtils.extractUsername(jwt);

                UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

                if (userDetails != null) {
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                            new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());


                usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));


                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    String newJwt = jwtUtils.generateToken(username);
                    Cookie cookie = new Cookie("token",newJwt);
                    cookie.setMaxAge(120);
                    cookie.setPath("/");
                    response.addCookie(cookie);
                }
            }

            filterChain.doFilter(request,response);
    }
}
