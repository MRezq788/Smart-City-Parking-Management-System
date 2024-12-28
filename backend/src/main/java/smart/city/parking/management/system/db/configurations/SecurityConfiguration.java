package smart.city.parking.management.system.db.configurations;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.JdbcUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import jakarta.servlet.Filter;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Autowired
    private JwtFilter jwtFilter;
    @Autowired
    private CorsConfig corsConfig;

    public SecurityConfiguration(JwtFilter jwtFilter, CorsConfig corsConfig) {
        this.jwtFilter = jwtFilter;
        this.corsConfig = corsConfig;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http.csrf(customizer -> customizer.disable())
                .cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)) // Enforce stateless sessions
                .httpBasic(Customizer.withDefaults())
                .addFilterBefore((Filter) jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .authorizeHttpRequests(configurer -> configurer
                    // .requestMatchers(HttpMethod.POST, "/auth/testo").hasRole("USER")
                    .requestMatchers(HttpMethod.POST, "/signin").permitAll()
                    .requestMatchers(HttpMethod.POST, "/signup/add").permitAll()
                    .requestMatchers(HttpMethod.POST, "/drivers/add").permitAll()
                    .requestMatchers("/admin/**").hasRole("ADMIN")
                    .requestMatchers("/report/**").permitAll()
                    .anyRequest().authenticated() // Secure all other APIs
//                     .anyRequest().permitAll()
                )
                .build();
    }

    @Bean
    public UserDetailsService userDetailsManager(DataSource dataSource) {
        JdbcUserDetailsManager jdbcUserDetailsManager = new JdbcUserDetailsManager(dataSource);

        // Define query to retrieve a user by username
        jdbcUserDetailsManager.setUsersByUsernameQuery(
                "SELECT username, password, " +
                // Assuming all accounts are enabled by default since 'enabled' is not in the schema
                "true AS enabled " +
                "FROM Account " +
                "WHERE username = ?");

        // Define query to retrieve the authorities/roles by username
        jdbcUserDetailsManager.setAuthoritiesByUsernameQuery(
                "SELECT username, role " +
                "FROM Account " +
                "WHERE username = ?");

        return jdbcUserDetailsManager;
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            UserDetailsService userDetailsService,
            PasswordEncoder encoder) throws Exception {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(encoder);
        return new ProviderManager(provider);
    }

}
