package uet.japit.k62.id3;/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import uet.japit.k62.dao.IDecisiveTreeConditionDAO;
import uet.japit.k62.models.entity.DecisiveTreeCondition;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Scanner;
import java.util.Vector;

@Component
public class Id3 {

    @Autowired
    IDecisiveTreeConditionDAO decisiveTreeConditionDAO;
    public static String [][] table = null;

    public String decision(String outlook, int temp, String wind, String date) {
        List<DecisiveTreeCondition> dataList = decisiveTreeConditionDAO.findAll();
        table = new String[dataList.size()][5];
        menu();
        ID3_calculation obj = new ID3_calculation(table);
        obj.calculate_class();
        obj.calculate_attribute();
        obj.calculate_entropy();
        obj.information_gain();
        
        List<Node> node = obj.getNode();
        HashMap<String,Double > information_gain = obj.getInformationGain();
        HashMap<String,String > information_gain_subAttribute = obj.getInformationGain_of_subAttribute();
        
        Vector attributes = obj.getlistofAttributes();
        GenerateTree tree = new GenerateTree(attributes , node , information_gain , information_gain_subAttribute  );
        tree.create_tree();
        tree.Display_attribute();
        tree.display_tree();

        String Outlook = outlook;
        int Temp = temp;
        String Wind = wind;
        String Date = date;

        return tree.Decision(Outlook, Temp, Wind, Date);
    }

    public void menu(){
        System.out.println("------- Decision Tree Implementation using ID3 Algorithm -------");
        System.out.println("-------  Condition -------");
        readData();
        change_numeric_to_name();
    }
    
    public  void change_numeric_to_name(){
        for(int j = 1 ; j < table.length; j++){
            if( Integer.parseInt(table[j][1]) >= 30  ){
               table[j][1] = "hot";
            }
            else if( Integer.parseInt(table[j][1]) >= 20  ){
               table[j][1] = "mild";
            }
            else if( Integer.parseInt(table[j][1]) < 20  ){
               table[j][1] = "cool";
            }
//                if( Integer.parseInt(table[j][2]) > 80  ){
//                   table[j][2] = "high";
//                }
//                else if( Integer.parseInt(table[j][2]) <= 80  ){
//                   table[j][2] = "normal";
//                }
        }
    }

    public void readData()
    {
        System.out.println("jdjfalkgfjgdsaf");
        table[0][0] = "Outlook";
        System.out.println(table[0][0]);
        table[0][1] = "Temp";
        table[0][2] = "Win";
        table[0][3] = "Date";
        table[0][4] = "Watching";
        List<DecisiveTreeCondition> dataList = decisiveTreeConditionDAO.findAll();
        for (int i = 1; i < dataList.size(); i++)
        {
            table[i][0] = dataList.get(i-1).getOutlook();
            table[i][1] = dataList.get(i-1).getTemp();
            table[i][2] = dataList.get(i-1).getWind();
            table[i][3] = dataList.get(i-1).getDate();
            table[i][4] = dataList.get(i-1).getWatching();
        }
    }

//    public void readData(String filename) {
//        String csvFile = filename;
//        BufferedReader br = null;
//        BufferedReader pre_count = null;
//
//        String line = "";
//        String cvsSplitBy = ",";
//
//        int row = 0;
//        int col = 0;
//        try {
//            pre_count = new BufferedReader(new FileReader(csvFile));
//            while ((line = pre_count.readLine()) != null) {
//                // use comma as separator
//                String[] attributes = line.split(cvsSplitBy);
//                col = attributes.length - 1;
//                row++;
//            }
//            // size of table
//            table = new String[row][col];
//            int rows = 0;
//            br = new BufferedReader(new FileReader(csvFile));
//            while ((line = br.readLine()) != null) {
//                String[] attributes = line.split(cvsSplitBy);
//                for (int i = 1; i < col + 1; i++) {
//                    table[rows][i - 1] = attributes[i];
//                }
//                rows++;
//            }
//
//        } catch (IOException e) {
//            System.out.println("File not found Exception");
//        } finally {
//            if (br != null) {
//                try {
//                    br.close();
//                } catch (IOException e) {
//                    System.out.println("File not found Exception Finally");
//                }
//            }
//        }
//    }
}
