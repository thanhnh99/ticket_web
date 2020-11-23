package uet.japit.k62.util;

import uet.japit.k62.models.entity.Category;
import uet.japit.k62.models.entity.Event;
import uet.japit.k62.models.entity.TicketClass;
import uet.japit.k62.models.response.data_response.ResCategory;
import uet.japit.k62.models.response.data_response.ResEvent;
import uet.japit.k62.models.response.data_response.ResHomeEvent;
import uet.japit.k62.models.response.data_response.ResTicketClass;

import java.util.ArrayList;
import java.util.List;

public class ConvertEntityToResponse {
    public static List<ResCategory> ConvertListCategoryEntity(List<Category> categoryEntityList)
    {
        List<ResCategory> resCategoryList = new ArrayList<>();
        for(Category categoryEntity : categoryEntityList)
        {
            ResCategory resCategory = new ResCategory(categoryEntity);
            resCategoryList.add(resCategory);
        }
        return resCategoryList;
    }

    public static List<ResEvent> ConvertListEventEntity(List<Event> eventEntityList)
    {
        List<ResEvent> resEventList = new ArrayList<ResEvent>();
        for(Event eventEntity : eventEntityList)
        {
            ResEvent resEvent = new ResEvent(eventEntity);
            resEventList.add(resEvent);
        }
        return resEventList;
    }

    public static List<ResHomeEvent> ConvertListHomeEventEntity(List<Event> eventEntityList)
    {
        List<ResHomeEvent> resEventList = new ArrayList<ResHomeEvent>();
        for(Event eventEntity : eventEntityList)
        {
            ResHomeEvent resEvent = new ResHomeEvent(eventEntity);
            resEventList.add(resEvent);
        }
        return resEventList;
    }

    public static List<ResTicketClass> ConvertListTicketClassEntity(List<TicketClass> ticketClassEntityList)
    {
        List<ResTicketClass> resTicketClassList = new ArrayList<ResTicketClass>();
        for(TicketClass ticketClassEntity : ticketClassEntityList)
        {
            ResTicketClass resTicketClass = new ResTicketClass(ticketClassEntity);
            resTicketClassList.add(resTicketClass);
        }
        return resTicketClassList;
    }
}
