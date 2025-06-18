package TT26_73.hoseshop.Service;

import TT26_73.hoseshop.Dto.Product.ProductCreateRequest;
import TT26_73.hoseshop.Dto.Product.ProductCreateResponse;
import TT26_73.hoseshop.Dto.Product.ProductResponse;
import TT26_73.hoseshop.Dto.Product.ProductUpdateRequest;
import TT26_73.hoseshop.Exception.AppException;
import TT26_73.hoseshop.Exception.ErrorCode;
import TT26_73.hoseshop.Mapper.ProductMapper;
import TT26_73.hoseshop.Model.Product;
import TT26_73.hoseshop.Repository.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Transactional
public class ProductService {
    private static final Logger log = LoggerFactory.getLogger(ProductService.class);
    ProductRepository productRepository;
    ProductMapper productMapper;


    public ProductCreateResponse productCreate(ProductCreateRequest request){
        // check exist
        if(productRepository.existsById(request.getProductId())){
            throw new AppException(ErrorCode.PRODUCT_EXISTED);
        }
        Product product = productMapper.toProductFromCreateRequest(request);
        // Xử lý ảnh
        MultipartFile imageFile = request.getImage();
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String uploadDir = "uploads/";
                File directory = new File(uploadDir);
                if (!directory.exists()) {
                    directory.mkdirs();
                }

                String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, fileName);
                Files.write(filePath, imageFile.getBytes());

                product.setImagePath("/uploads/" + fileName); // lưu đường dẫn
            } catch (IOException e) {
                throw new AppException(ErrorCode.FILE_UPLOAD_ERROR);
            }
        }

        // save
        productRepository.save(product);
        return productMapper.toCreateResponse(product);
    }

    public ProductResponse updateProduct(ProductUpdateRequest request){
        Product product = productRepository.findById(request.getProductId()).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        productMapper.updateProduct(product, request);

        // Nếu người dùng upload ảnh mới
        MultipartFile imageFile = request.getImage();
        if (imageFile != null && !imageFile.isEmpty()) {
            try {
                String uploadDir = "uploads/";
                File directory = new File(uploadDir);
                if (!directory.exists()) directory.mkdirs();

                String fileName = UUID.randomUUID() + "_" + imageFile.getOriginalFilename();
                Path filePath = Paths.get(uploadDir, fileName);
                Files.write(filePath, imageFile.getBytes());

                product.setImagePath("/uploads/" + fileName); // Ghi đè ảnh cũ
            } catch (IOException e) {
                throw new AppException(ErrorCode.FILE_UPLOAD_ERROR);
            }
        }
        productRepository.save(product);
        return productMapper.toProductResponse(product);
    }

    public List<ProductResponse>  filterByNameCategory(String categoryName){
        return productRepository.findAllByCategorySet_NameCateOrderByPricesAsc(categoryName).stream().map(productMapper::toProductResponse).toList();
    }

    public List<ProductResponse> filterByBrand(String brand){
        return productRepository.findAllByBrandOrderByPricesAsc(brand).stream().map(productMapper::toProductResponse).toList();
    }

    public List<ProductResponse> filterByGender(String gender){
        return productRepository.findAllByGenderOrderByPricesAsc(gender).stream().map(productMapper::toProductResponse).toList();
    }

    public List<ProductResponse> getListProduct(){
        return productRepository.findAll().stream().map(productMapper::toProductResponse).toList();
    }

    public ProductResponse getProductById(String id){
        return productMapper.toProductResponse(productRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND)));
    }

    public void deleteProductById(String id) throws IOException {

        // xóa ảnh trong db
        Product product = productRepository.findById(id).orElseThrow(()-> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        log.info("imagePath: {}", product.getImagePath());
        String relativeImagePath = product.getImagePath();

        // đường dẫn tuyệt đối
        String absoluteUploadDir = System.getProperty("user.dir") + "/uploads";
        Path fullImagePath = Paths.get(absoluteUploadDir, Paths.get(relativeImagePath).getFileName().toString());

        Files.deleteIfExists(fullImagePath);

        productRepository.delete(product);
    }
}
