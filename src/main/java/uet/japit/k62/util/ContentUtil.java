package uet.japit.k62.util;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.lowagie.text.DocumentException;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.ClassPathResource;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import org.thymeleaf.templatemode.TemplateMode;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.HashMap;


public class ContentUtil {
    public  static String parseThymeleafTemplate(HashMap<String, Object> data, String template) {
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
    public static byte[] generateQRCode(String content, String ext) throws IOException, WriterException {
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
        MatrixToImageWriter.writeToStream(matrix, ext, image);
        return  image.toByteArray();
    }
    public static byte[] htmlToPdf(String html) throws DocumentException, IOException {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        ITextRenderer renderer = new ITextRenderer();
        System.out.println(new ClassPathResource("templates/ticket-information.html").getURI().getPath());
//        renderer.getFontResolver().addFont("arialuni.ttf", BaseFont.IDENTITY_H, BaseFont.EMBEDDED);
//        renderer.getFontResolver().getFontFamily("Arial");
        renderer.setDocumentFromString(html);
        renderer.layout();
        renderer.createPDF(outputStream);

        outputStream.flush();
        return outputStream.toByteArray();
    }
    public static void saveImage(byte[] img, String path) throws IOException {
        String currentPath = Paths.get("").toAbsolutePath().toString();
        String saveToSeverPath = currentPath + "/src/main/resources/static/images/" + path;
        File file = new File(saveToSeverPath);
        file.createNewFile();
        FileUtils.writeByteArrayToFile(file, img);
    }
//    public static void main(String[] args) {
//        try {
//            HashMap<String, Object> mapper = new HashMap<>();
//            mapper.put("name", "Huệ");
//            mapper.put("event_name", "HAAS");
//            mapper.put("ticket_name", "VIP");
//            mapper.put("ticket_code", "ABC12345678");
//            byte[] image = generateQRCode("ABC12345678", "png");
//            String image_encoded = "data:image/png;base64, " + new String(Base64.getEncoder().encode(image ));
//            mapper.put("img", image_encoded);
//            String html = parseThymeleafTemplate(mapper, "templates/ticket-information.html");
//            System.out.println(html);
//            byte[] pdf = htmlToPdf(html);
//            File file = new File("D:\\uet_vnu\\learn_in_class\\web\\ticket_web\\src\\main\\resources\\templates\\mail2.pdf");
//            file.createNewFile();
//            FileUtils.writeByteArrayToFile(file, pdf);
//
//        } catch (IOException | WriterException | DocumentException e) {
//            e.printStackTrace();
//        }
//    }
}


