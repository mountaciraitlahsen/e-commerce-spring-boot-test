package com.mountacir.service;

import com.mountacir.model.entity.Product;
import com.mountacir.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.UUID;
@Service
public class ProductService {
    private final S3Client s3Client;
    private final ProductRepository productRepository;

    @Value("${aws.s3.bucket-name}")
    private String bucketName;

    @Value("${aws.s3.endpoint}")
    private String endpoint;

    public ProductService(S3Client s3Client, ProductRepository productRepository) {
        this.s3Client = s3Client;
        this.productRepository = productRepository;
    }

    public Product saveProduct(String name, String description, BigDecimal price, Integer stock, String category, MultipartFile imageFile) throws IOException {
        String imageUrl = null;

        if (imageFile != null && !imageFile.isEmpty()) {
            String originalName = imageFile.getOriginalFilename();
            String extension = originalName.substring(originalName.lastIndexOf("."));

            String uniqueFileName = "products/" + UUID.randomUUID().toString() + extension;

            PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                    .bucket(bucketName)
                    .key(uniqueFileName)
                    .contentType(imageFile.getContentType())
                    .build();

            s3Client.putObject(putObjectRequest, RequestBody.fromBytes(imageFile.getBytes()));

            imageUrl = endpoint + "/" + bucketName + "/" + uniqueFileName;
        }

        Product product = Product.builder().name(name).description(description).category(category).price(price).stock(stock).productImageUrl(imageUrl).build();

        return productRepository.save(product);
    }
}

