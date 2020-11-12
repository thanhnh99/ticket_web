package uet.japit.k62.models.response.data_response;


import lombok.Data;
import uet.japit.k62.models.entity.Category;

@Data
public class ResCategory {
    private String id;
    private String name;
    private String code;

    public ResCategory(Category categoryEntity)
    {
        this.id = categoryEntity.getId();
        this.name = categoryEntity.getName();
        this.code = categoryEntity.getCode();
    }

}
