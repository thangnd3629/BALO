package com.hust.zaloclonebackend.util;

import java.text.ParseException;

public class EpochConverter {
    public static String getCurrentEpoch() throws ParseException
    {
        Long epoch = new java.text.SimpleDateFormat("MM/dd/yyyy HH:mm:ss").parse("01/01/1970 01:00:00").getTime() / 1000;
        return epoch.toString();
    }
    public static String fromEpochToDate(String epoch)
    {
        String date = new java.text.SimpleDateFormat("MM/dd/yyyy HH:mm:ss").format(new java.util.Date (Long.parseLong(epoch)*1000));
        return date;
    }
    
}
