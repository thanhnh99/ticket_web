package uet.japit.k62.util;

import java.text.Normalizer;
import java.util.regex.Pattern;

public class StringConvert {
    public static String convertStringToCode(String convertString)
    {
        convertString = convertString.toUpperCase();
        convertString = convertString.replace(" ", "_");
        convertString = convertString.replace("Đ", "D");

        convertString = Normalizer.normalize(convertString, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        return pattern.matcher(convertString).replaceAll("");
    }
}
