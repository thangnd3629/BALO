package com.hust.zaloclonebackend.util;

import java.text.ParseException;

//convert to time epoch to be stored in DB for datetime consideration
public class EpochConverter {
    
    public static String getCurrentEpoch() throws ParseException
    {
        Long epoch = System.currentTimeMillis()/1000;
        return epoch.toString();
    }
    public static String fromEpochToDate(String epoch)
    {
        String date = new java.text.SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(new java.util.Date (Long.parseLong(epoch)*1000));
        return date;
    }
    public static String fromDateToEpoch(String date) throws ParseException
    {
        Long epoch = new java.text.SimpleDateFormat("MM/dd/yyyy HH:mm:ss").parse(date).getTime() / 1000;
        return epoch.toString();
    }    
}
