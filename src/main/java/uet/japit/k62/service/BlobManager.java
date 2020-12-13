package uet.japit.k62.service;

import com.microsoft.azure.storage.OperationContext;
import com.microsoft.azure.storage.StorageException;
import com.microsoft.azure.storage.blob.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
@Service
public class BlobManager {
    @Autowired
    private CloudBlobClient cloudBlobClient;
    private CloudBlobContainer cloudBlobContainer;
    public boolean createContainer(String containerName){
        if (cloudBlobContainer != null){
            return true;
        }
        boolean containerCreated = false;

        try {
            cloudBlobContainer = cloudBlobClient.getContainerReference(containerName);
        } catch (URISyntaxException | StorageException e) {

            e.printStackTrace();
        }
        try {
            containerCreated = cloudBlobContainer.createIfNotExists(BlobContainerPublicAccessType.CONTAINER, new BlobRequestOptions(), new OperationContext());
        } catch (StorageException e) {

            e.printStackTrace();
        }
        return containerCreated;
    }
    public URI upload(MultipartFile multipartFile){
        URI uri = null;
        CloudBlockBlob blob = null;
        try {

            blob = cloudBlobContainer.getBlockBlobReference(multipartFile.getOriginalFilename());
            blob.upload(multipartFile.getInputStream(), -1);
            uri = blob.getUri();
        } catch (URISyntaxException | StorageException | IOException e) {
            e.printStackTrace();
        }
        return uri;
    }
}
