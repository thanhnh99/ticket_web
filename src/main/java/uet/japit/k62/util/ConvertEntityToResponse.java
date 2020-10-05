package uet.japit.k62.util;

import uet.japit.k62.models.entity.Category;
import uet.japit.k62.models.response.data_response.ResCategory;

import java.util.ArrayList;
import java.util.List;

public class ConvertEntityToResponse {
    public static List<ResCategory> ConvertCategory(List<Category> categoryEntityList)
    {
        List<ResCategory> resCategoryList = new ArrayList<>();
        for(Category categoryEntity : categoryEntityList)
        {
            ResCategory resCategory = new ResCategory(categoryEntity);
            resCategoryList.add(resCategory);
        }
        return resCategoryList;
    }
}
