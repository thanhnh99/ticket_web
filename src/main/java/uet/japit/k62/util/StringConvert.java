package uet.japit.k62.util;

public class StringConvert {
    public static String convertStringToCode(String convertString)
    {
        convertString = convertString.toLowerCase();
        convertString = convertString.replace(" ", "-");
        return convertString;
    }
}
