package uet.japit.k62.models.request;

public class ReqAttachmentFile {
    public enum FileType {
        PDF,
        PLAIN_TEXT
    }
    private FileType contentType;
    private String fileName;
    private String encodedContent;

    public String getContentType() {
        switch (contentType){
            case PDF:
                return "application/pdf";
            case PLAIN_TEXT:
                return "text/plain";
            default:
                throw new RuntimeException("this content type not supported");
        }
    }

    public void setContentType(FileType contentType) {
        this.contentType = contentType;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getEncodedContent() {
        return encodedContent;
    }

    public void setEncodedContent(String encodedContent) {
        this.encodedContent = encodedContent;
    }
}
