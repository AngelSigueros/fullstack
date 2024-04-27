package com.sas.controller;

import com.sas.dto.Login;
import com.sas.dto.Register;
import com.sas.dto.Token;
import com.sas.model.Role;
import com.sas.model.User;
import com.sas.repository.UserRepository;
import com.sas.security.SecurityUtils;
import com.sas.service.FileService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.concurrent.TimeUnit;


@CrossOrigin("*")
@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepo;
    private final FileService fileService;
    private final PasswordEncoder passwordEncoder;


    public UserController(UserRepository userRepo, FileService fileService, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.fileService = fileService;
        this.passwordEncoder = passwordEncoder;
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable Long id) {
        log.info(this.getClass().getName() + " - findById " + id);
        return userRepo.findById(id).orElseThrow();
    }


    @GetMapping()
    public List<User> findAll() {
        log.info(this.getClass().getName() + " - findAll");
        return userRepo.findAll();
    }


    @PostMapping()
    public User saveUser(@RequestBody User user) {
        log.info(this.getClass().getName() + " - saveUser");
        // Todo
        return userRepo.save(user);
    }


    @PutMapping("/{id}")
    public User updateUser(@RequestBody User user, @PathVariable Long id) {
        log.info(this.getClass().getName() + " - updateUser " + id);
        // ToDo
        if (this.userRepo.existsById(id))
            return userRepo.save(user);
        else
            throw new NoSuchElementException();
    }


    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) {
        log.info(this.getClass().getName() + " - deleteUser " + id);
        userRepo.deleteById(id);
    }


    @DeleteMapping()
    public void deleteAll() {
        log.info(this.getClass().getName() + " - deleteAll");
        userRepo.deleteAll();
    }


    @PostMapping("/register")
    public void register(@RequestBody Register register) {

        if (this.userRepo.existsByEmail(register.email())) {
            throw new BadCredentialsException("Email ocupado!");
        }

        //User user = new User(null, null, register.email(), register.password(), Role.USER);
        User user = User.builder()
                .email(register.email())
                .password(passwordEncoder.encode(register.password()))
                .role(Role.USER)
                .build();
        this.userRepo.save(user);

    }


    @PostMapping("/login")
    public Token login(@RequestBody Login login) {
        if (!this.userRepo.existsByEmail(login.email())) {
            throw new NoSuchElementException("Usuario no encontrado!");
        }

        User user = this.userRepo.findByEmail(login.email()).orElseThrow();

        if (!passwordEncoder.matches(login.password(), user.getPassword())) {
            throw new BadCredentialsException("Las passwords no coinciden");
        }

//        String token = Jwts.builder()
//                .signWith(Keys.hmacShaKeyFor("admin".getBytes()), SignatureAlgorithm.HS512)
//                .setHeaderParam("typ", "JWT")
//                .setSubject(String.valueOf(user.getId()))
//                .setIssuedAt(new Date())
//                .setExpiration(new Date(System.currentTimeMillis() + (3600 * 24 * 1000)))
//                .claim("email", user.getEmail())
//                .claim("role", "admin")
//                .compact();

//        String token = Jwts.builder()
//// id del usuario
//                .subject(String.valueOf(user.getId()))
//// La clave secreta para firmar el token y saber que es nuestro cuando lleguen las peticiones del frontend
//                .signWith(Keys.hmacShaKeyFor("admin1234admin1234admin1234admin1234admin1234admin1234".getBytes()))
//// Fecha emisión del token
//                .issuedAt(new Date())
//// información personalizada: rol, username, email...
//                .claim("role", "admin")
//// Construye el token
//                .compact();

        // Alternativa actual no deprecada

        // JWT Json Web Token: jwt.io
        // Generar token de acceso: eyJhbGciOiJIUzI1NiIsIn......
        // Generar el token: https://github.com/jwtk/jjwt?tab=readme-ov-file#creating-a-jwt
        Date issuedDate = new Date();
        long nextWeekMillis = TimeUnit.DAYS.toMillis(7);
        Date expirationDate = new Date(issuedDate.getTime() + nextWeekMillis);
        byte[] key = Base64.getDecoder().decode("FZD5maIaX04mYCwsgckoBh1NJp6T3t62h2MVyEtdo3w=");

        String token = Jwts.builder()
                // id del usuario
                .subject(String.valueOf(user.getId()))
                // La clave secreta para firmar el token y saber que es nuestro cuando lleguen las peticiones del frontend
                .signWith(Keys.hmacShaKeyFor(key))
                // Fecha emisión del token
                .issuedAt(issuedDate)
                // Fecha de expiración del token
                .expiration(expirationDate)
                // información personalizada: rol, username, email...
                .claim("role", user.getRole())
                .claim("email", user.getEmail())
                // Construye el token
                .compact();

        return new Token(token);
    }


    @GetMapping("/account")
    public User getCurrentUser() {
        return SecurityUtils.getCurrentUser().orElseThrow();
    }


    @PutMapping("/account")
    public User update(@RequestBody User user) {
        // Si está autenticado y es ADMIN o es el mismo usuario que la variable user
        // entonces actualizar, en caso contrario no actualizamos
        SecurityUtils.getCurrentUser().ifPresent(currentUser-> {
            if (currentUser.getRole() == Role.ADMIN || Objects.equals(currentUser.getId(), user.getId())) {
                this.userRepo.save(user);
            } else {
                throw new RuntimeException("No puede actualizar");
            }
        });
        return user;
    }

    // subir avatar
    @PostMapping("/avatar")
    public User uploadAvatar(
            @RequestParam(value = "photo") MultipartFile file
    ) {

        User user = SecurityUtils.getCurrentUser().orElseThrow();

        if (file != null && !file.isEmpty()) {
            String fileName = fileService.store(file);
            user.setPhotoUrl(fileName);
            this.userRepo.save(user);
        }

        return user;
    }
}














