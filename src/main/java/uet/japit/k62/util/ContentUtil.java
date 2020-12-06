package uet.japit.k62.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.lowagie.text.DocumentException;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.*;
import java.util.Base64;
import java.util.HashMap;


public class ContentUtil {
    public  static String parseThymeleafTemplate(HashMap<String, String> data, String template) {
        ClassLoaderTemplateResolver templateResolver = new ClassLoaderTemplateResolver();
        templateResolver.setSuffix(".html");
        templateResolver.setTemplateMode(TemplateMode.HTML);

        TemplateEngine templateEngine = new TemplateEngine();
        templateEngine.setTemplateResolver(templateResolver);

        Context context = new Context();
        data.forEach(context::setVariable);
        context.setVariable("to", "hai");
        return templateEngine.process( template, context);
    }
    public static byte[] generateQRCode(String content, String path) throws IOException, WriterException {
        BitMatrix matrix = new MultiFormatWriter().encode(
                new String(content.getBytes("UTF-8"), "UTF-8"),
                BarcodeFormat.QR_CODE, 225, 225);
        ByteArrayOutputStream image = new ByteArrayOutputStream();
//        File file = new File(path);
//        file.createNewFile();
//        MatrixToImageWriter.writeToPath(
//                matrix,
//                path.substring(path.lastIndexOf('.') + 1),
//                file.toPath());
        MatrixToImageWriter.writeToStream(matrix, path, image);
        return  image.toByteArray();
    }
    public static byte[] htmlToPdf(String html) throws DocumentException, IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        ITextRenderer renderer = new ITextRenderer();

        renderer.setDocumentFromString(html);
        renderer.layout();
        renderer.createPDF(outputStream);

        outputStream.close();
        return outputStream.toByteArray();
    }
    public static void main(String[] args) {
        try {
            HashMap<String, String> mapper = new HashMap<>();
            mapper.put("name", "Huệ");
            mapper.put("event_name", "HAAS");
            mapper.put("ticket_name", "VIP");
            mapper.put("ticket_code", "ABC12345678");
            byte[] image = generateQRCode("ABC12345678", "png");
            String image_encoded =  new String(Base64.getEncoder().encode(image ));
            mapper.put("img", image_encoded);
            String html = parseThymeleafTemplate(mapper, "templates/ticket-information.html");
            htmlToPdf(html);

        } catch (IOException | WriterException | DocumentException e) {
            e.printStackTrace();
        }
    }
}


