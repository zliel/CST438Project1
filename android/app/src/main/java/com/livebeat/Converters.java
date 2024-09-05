package com.livebeat;

import androidx.room.TypeConverter;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.lang.reflect.Type;
import java.util.ArrayList;

// The solution to the issue of storing arrays was found at https://stackoverflow.com/questions/69792550/how-do-i-set-up-a-room-database-with-an-array-of-data-class
public class Converters {
    @TypeConverter
    public ArrayList<String> fromString(String value) {
        Type listType = new TypeToken<ArrayList<String>>() {}.getType();
        return new Gson().fromJson(value, listType);
    }

    @TypeConverter
    public static String fromArrayList(ArrayList<String> arrList) {
        return new Gson().toJson(arrList);
    }
}
