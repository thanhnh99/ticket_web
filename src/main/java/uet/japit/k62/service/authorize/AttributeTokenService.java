package uet.japit.k62.service.authorize;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import uet.japit.k62.filters.JwtTokenProvider;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

public  class AttributeTokenService {
    private static final String SECRET = JwtTokenProvider.SECRET;
    private static final String TOKEN_PREFIX = JwtTokenProvider.TOKEN_PREFIX;

    //retrieve username from jwt token
    public static String getEmailFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }


    //retrieve expiration date from jwt token
    public static Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }


    public static  <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }


    //for retrieveing any information from token we will need the secret key
    public static Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(SECRET).parseClaimsJws(token.replace(TOKEN_PREFIX, "")).getBody();
    }


    public static List<String> getPermissionFromToken(String token)
    {
        Object o = getAllClaimsFromToken(token).get("permission");
        if ( o instanceof List) {
            List<String> data = (ArrayList<String>) getAllClaimsFromToken(token).get("permission");
            return data;
        }
        return null;
    }

    public static boolean checkAccess(String token, String permissionCheck)
    {
        List<String> permissionFromToken = getPermissionFromToken(token);
        if(permissionFromToken != null)
        {
            for(String role : permissionFromToken)
            {
                if(permissionCheck.equals(role))
                {
                    return true;
                }
            }
        }
        return false;
    }

}
