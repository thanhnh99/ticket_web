package uet.japit.k62.filters;

import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import uet.japit.k62.models.auth.CustomUserDetail;

import java.util.Date;

@Component
@Slf4j
public class JwtTokenProvider {
    static final long EXPIRATIONTIME = 86_400_000; // 1 day
    public static final String SECRET = "SecretKey";
    public static final String TOKEN_PREFIX = "Bearer";

    public String generateJwt(CustomUserDetail userDetail) {
        Date now = new Date();
        Date expirationDate = new Date(now.getTime() + EXPIRATIONTIME);

        //Tạo JWT
        return Jwts.builder()
                .setSubject((userDetail.getUser().getEmail()))
                .setIssuedAt(now)
                .setExpiration(expirationDate)
                .claim("password", userDetail.getPassword())
                .claim("username",userDetail.getUsername())
                .claim("permissions", userDetail.getAuthorities())
                .claim("roles", userDetail.getAccountType())
                .signWith(SignatureAlgorithm.HS512, SECRET)
                .compact();
    }

    // Lấy thông tin user từ jwt
    public String getUserNameFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(SECRET).parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty.");
        }
        return false;
    }
}
